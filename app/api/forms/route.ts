import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const formsPath = path.join(process.cwd(), 'data', 'forms.json');
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

// Ensure uploads directory exists
async function ensureUploadsDirectory() {
  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath, { recursive: true });
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(formsPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ forms: [] });
  }
}

export async function POST(request: Request) {
  try {
    await ensureUploadsDirectory();

    const formData = await request.formData();
    
    // Debug: Log all form data
    console.log('Received form data:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const name = formData.get('name') as string;
    const position = JSON.parse(formData.get('position') as string);
    const content = formData.get('content') as string;
    const profile_link = formData.get('profile_link') as string;
    const imageFile = formData.get('image') as File;

    // Debug: Log parsed data
    console.log('Parsed data:', {
      name,
      position,
      content,
      profile_link,
      hasImage: !!imageFile
    });

    // Validate required fields
    if (!name || !position || !content || !profile_link) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrl = '';
    if (imageFile) {
      const fileExtension = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = path.join(uploadsPath, fileName);
      
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      
      imageUrl = `/uploads/${fileName}`;
    }

    // Ensure forms.json exists
    try {
      await fs.access(formsPath);
    } catch {
      await fs.writeFile(formsPath, JSON.stringify({ forms: [] }), 'utf-8');
    }

    const data = await fs.readFile(formsPath, 'utf-8');
    const { forms = [] } = JSON.parse(data);
    
    const newForm = {
      id: uuidv4(),
      name,
      position,
      content,
      image: imageUrl,
      profile_link
    };
    
    forms.push(newForm);
    
    await fs.writeFile(formsPath, JSON.stringify({ forms }, null, 2));
    
    return NextResponse.json(newForm);
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Failed to create form', details: (error as Error).message },
      { status: 500 }
    );
  }
} 