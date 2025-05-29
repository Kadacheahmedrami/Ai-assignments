// app/api/run-code/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate that code is provided
    if (!body.code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Proxy the request to the Python compiler API
    const response = await fetch('https://python-compiler-server-vercel.vercel.app/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: body.code })
    });

    if (!response.ok) {
      throw new Error(`Python API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to execute code',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to test if the API is working
export async function GET() {
  return NextResponse.json({ 
    message: 'Python code execution API is running',
    endpoint: '/api/run-code',
    method: 'POST'
  });
}