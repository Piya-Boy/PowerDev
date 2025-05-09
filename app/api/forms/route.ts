import { NextRequest, NextResponse } from 'next/server';

const MOCK_API_URL = 'https://6817abbb26a599ae7c3b163b.mockapi.io/api/powerdev/name';

export async function GET() {
  const res = await fetch(MOCK_API_URL);
  const data = await res.json();
  return Response.json({ forms: data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(MOCK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
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

    const response = await fetch(`${MOCK_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        position,
        content,
        image: imageUrl,
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

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