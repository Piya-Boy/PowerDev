import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this example, we'll just write it to the filesystem in a new directory
    const uploadDir = join(process.cwd(), 'public/uploads')
    
    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const filename = `${uniqueSuffix}-${file.name}`
    const path = join(uploadDir, filename)
    
    await writeFile(path, buffer)
    
    // Return the public URL
    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      success: true 
    })
    
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file.' },
      { status: 500 }
    )
  }
} 