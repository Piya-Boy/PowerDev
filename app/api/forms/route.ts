import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Ensure the forms.json file exists
const ensureFormsFile = async () => {
  const filePath = path.join(process.cwd(), 'data', 'forms.json');
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify({ forms: [] }));
  }
};

// Upload image to Cloudinary
const uploadToCloudinary = async (file: File) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
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
          if (error) reject(error);
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

export async function GET() {
  try {
    await ensureFormsFile();
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading forms:', error);
    return NextResponse.json({ error: 'Failed to read forms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    const profile_link = formData.get('profile_link') as string;

    // Validate required fields
    if (!name || !position || !content || !profile_link) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrl = '';
    if (imageFile) {
      try {
        const result = await uploadToCloudinary(imageFile);
        imageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Read existing forms
    await ensureFormsFile();
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    // Add new form
    const newForm = {
      id: Date.now().toString(),
      name,
      position,
      content,
      image: imageUrl,
      profile_link,
      createdAt: new Date().toISOString(),
    };

    forms.push(newForm);

    // Save updated forms
    await fs.writeFile(filePath, JSON.stringify({ forms }, null, 2));

    return NextResponse.json(newForm);
  } catch (error) {
    console.error('Error saving form:', error);
    return NextResponse.json({ error: 'Failed to save form' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    const existingImage = formData.get('existingImage') as string;
    const profile_link = formData.get('profile_link') as string;

    let imageUrl = existingImage;
    if (imageFile) {
      try {
        const result = await uploadToCloudinary(imageFile);
        imageUrl = (result as any).secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Read existing forms
    await ensureFormsFile();
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    // Update form
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

    // Save updated forms
    await fs.writeFile(filePath, JSON.stringify({ forms: updatedForms }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Read existing forms
    await ensureFormsFile();
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    // Delete form
    const updatedForms = forms.filter((form: any) => form.id !== id);

    // Save updated forms
    await fs.writeFile(filePath, JSON.stringify({ forms: updatedForms }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
} 