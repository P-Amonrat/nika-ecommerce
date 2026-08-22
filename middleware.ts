import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  if (pathname.startsWith('/th') || pathname.startsWith('/en')) {
    return NextResponse.next();
  }

  // If no locale, redirect to /en
  return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
