"use server";
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply to routes that modify data
  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
    const authHeader = request.headers.get('authorization');
    const expectedApiKey = process.env.API_SECRET_KEY;

    if (!expectedApiKey) {
      // This is a server configuration error
      console.error('API_SECRET_KEY is not set in environment variables.');
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Internal Server Error' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${expectedApiKey}`) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
