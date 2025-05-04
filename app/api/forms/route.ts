import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, position, content, image, profile_link } = body;

    if (!name || !position || !content || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    const newForm = {
      id: crypto.randomUUID(),
      name,
      position,
      content,
      image,
      profile_link,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    forms.push(newForm);
    await fs.writeFile(filePath, JSON.stringify({ forms }, null, 2));

    return NextResponse.json(newForm);
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json(
      { error: 'Failed to create form' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const imageUrl = formData.get('image') as string;
    const profile_link = formData.get('profile_link') as string;

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