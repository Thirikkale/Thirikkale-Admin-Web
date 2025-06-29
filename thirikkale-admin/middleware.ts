import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Exclude paths that should be publicly accessible
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/login' ||
    pathname === '/reset-password' ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/) ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated - pass the secret explicitly
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-here" 
  })
  
  if (!token) {
    // Redirect to login if not authenticated
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Specify which paths to run middleware on
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, reset-password (auth pages)
     * - files with common image extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|reset-password).*)',
  ],
}