import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const testimonialSchema = z.object({
  position: z.array(z.string()).min(1, 'Position is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().url('Invalid URL').optional(),
  profile_link: z.string().url('Invalid URL').optional(),
  userId: z.number().int('userId must be an integer'),
});

const updateTestimonialSchema = testimonialSchema.extend({
  id: z.string().min(1, 'ID is required'),
});

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      include: { user: true },
    });
    return NextResponse.json({ forms: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);
    const newTestimonial = await prisma.testimonial.create({
      data: validatedData,
      include: { user: true },
    });
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      ...rawData,
      userId: rawData.userId ? Number(rawData.userId.toString()) : undefined,
    };
    const validatedData = updateTestimonialSchema.parse(data);
    const { id, ...rest } = validatedData;
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: rest,
      include: { user: true },
    });
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}