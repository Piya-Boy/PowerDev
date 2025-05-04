import { NextRequest, NextResponse } from 'next/server';

const MOCK_API_URL = 'https://6817abbb26a599ae7c3b163b.mockapi.io/api/powerdev/name';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const response = await fetch(`${MOCK_API_URL}/${id}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const form = await response.json();
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

    const response = await fetch(`${MOCK_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        position,
        content,
        image,
        profile_link,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update form');
    }

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
    const response = await fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete form');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
}