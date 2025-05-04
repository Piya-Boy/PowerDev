import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const formsPath = path.join(process.cwd(), 'data', 'forms.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, position, content, image, profile_link } = body;

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
          image,
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'data', 'forms.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const { forms } = JSON.parse(data);

    const updatedForms = forms.filter((form: any) => form.id !== id);
    await fs.writeFile(filePath, JSON.stringify({ forms: updatedForms }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
}