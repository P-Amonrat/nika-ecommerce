import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7230';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const pageNumber = searchParams.get('pageNumber') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    // Call external API
    const url = `${EXTERNAL_API_BASE}/api/Categories?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    console.log('Fetching from external API:', url);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      // For development, we need to handle self-signed certificates
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - Node.js fetch doesn't have this in types but it works
        ca: undefined, // This allows self-signed certificates
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          error: `External API error: ${response.statusText}`,
          message: 'Failed to fetch categories from external API',
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      statusCode: 200,
      message: 'Categories fetched successfully',
    });
  } catch (error: any) {
    console.error('Error fetching categories:', error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        error: error.message,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
