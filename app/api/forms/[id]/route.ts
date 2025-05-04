import { NextRequest, NextResponse } from 'next/server';
import type { RequestContext } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const formsPath = path.join(process.cwd(), 'data', 'forms.json');
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

// Upload image to Cloudinary
const uploadToCloudinary = async (file: File) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary credentials');
      throw new Error('Cloudinary credentials are not properly configured');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'powerdev/forms',
          public_id: `${uuidv4()}-${file.name}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          }
          if (result) resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const id = params.id;
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);
    const form = forms.find((f: any) => f.id === id);

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error('Error reading form:', error);
    return NextResponse.json({ error: 'Failed to read form' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const id = params.id;
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    const existingImage = formData.get('existingImage') as string;
    const profile_link = formData.get('profile_link') as string;

    let imageUrl = existingImage;
    if (imageFile && imageFile.size > 0) {
      try {
        const result = await uploadToCloudinary(imageFile);
        imageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        if (!existingImage) {
          return NextResponse.json(
            { error: 'Failed to upload image and no existing image available' },
            { status: 500 }
          );
        }
        imageUrl = existingImage;
      }
    }

    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    const updatedForms = forms.map((form: any) => {
      if (form.id === id) {
        return {
          ...form,
          name,
          position,
          content,
          image: imageUrl,
          profile_link,
          updatedAt: new Date().toISOString(),
        };
      }
      return form;
    });

    await fs.writeFile(filePath, JSON.stringify({ forms: updatedForms }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const id = params.id;
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    const formToDelete = forms.find((f: any) => f.id === id);
    if (formToDelete?.image) {
      try {
        const publicId = formToDelete.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    const updatedForms = forms.filter((form: any) => form.id !== id);
    await fs.writeFile(filePath, JSON.stringify({ forms: updatedForms }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
}