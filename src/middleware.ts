import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response headers
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://accounts.scdn.co https://*.spotify.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://*.spotify.com https://*.scdn.co;
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
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })

  response.headers.set(
    'Content-Security-Policy',
    cspHeader
  )

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)'
  ]
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
