import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const formsPath = path.join(process.cwd(), 'data', 'forms.json');
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

// Helper function to delete image file
async function deleteImage(imagePath: string) {
  try {
    const fullPath = path.join(uploadsPath, imagePath.replace(/^\/uploads\//, ''));
    await fs.unlink(fullPath);
    // console.log('Image deleted successfully:', fullPath);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
    }

    const data = await fs.readFile(formsPath, 'utf-8');
    const { forms } = JSON.parse(data);

    const index = forms.findIndex((f: any) => f.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const profile_link = formData.get('profile_link') as string;
    const imageFile = formData.get('image') as File;

    let imageUrl = forms[index].image; // Keep existing image by default

    if (imageFile) {
      // Delete old image if it exists
      if (forms[index].image) {
        await deleteImage(forms[index].image);
      }

      // Save new image
      const fileExtension = imageFile.name.split('.').pop();
      const fileName = `${id}.${fileExtension}`;
      const filePath = path.join(uploadsPath, fileName);
      
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      
      imageUrl = `/uploads/${fileName}`;
    }

    // Update form data
    forms[index] = {
      ...forms[index],
      name,
      position,
      content,
      profile_link,
      image: imageUrl
    };

    await fs.writeFile(formsPath, JSON.stringify({ forms }, null, 2));
    return NextResponse.json(forms[index]);
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json({ 
      error: 'Failed to update form',
      details: (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
    }

    const data = await fs.readFile(formsPath, 'utf-8');
    const { forms } = JSON.parse(data);

    // Find the form to delete
    const formToDelete = forms.find((form: any) => form.id === id);
    if (!formToDelete) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    // Delete image file if it exists
    if (formToDelete.image) {
      await deleteImage(formToDelete.image);
    }

    // Remove form from array
    const updatedForms = forms.filter((form: any) => form.id !== id);

    // Write updated data back to file
    await fs.writeFile(
      formsPath,
      JSON.stringify({ forms: updatedForms }, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete form', details: (error as Error).message },
      { status: 500 }
    );
  }
} 