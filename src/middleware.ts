import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response headers
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://accounts.scdn.co https://*.spotify.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://*.spotify.com https://*.scdn.co;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://api.spotify.com https://accounts.spotify.com;
    media-src 'self' https://*.spotify.com https://*.scdn.co;
  `.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  // Only apply middleware to pages, not api routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })

  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images/|api/).*)'
}
