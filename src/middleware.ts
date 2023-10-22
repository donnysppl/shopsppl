import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname

  if (request.nextUrl.pathname.startsWith('/backend')) {
    const isPublicPath = path === '/backend/backend-login';

    const token = request.cookies.get('admin-token')?.value || '';

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/backend/backend-dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/backend/backend-login', request.nextUrl))
    }
  }

  if (request.nextUrl.pathname.startsWith('/customer')) {
    const isCustLoginPublicPath = path === '/customer/login';
    const isCustForgotPublicPath = path === '/customer/forgot-password';
    // const isCustLoginPublicPath = path === '/customer/login';

    const token = request.cookies.get('customer-token')?.value || '';

    if (isCustLoginPublicPath) {
      if (isCustLoginPublicPath && token) {
        return NextResponse.redirect(new URL('/customer/dashboard', request.nextUrl))
      }

      if (!isCustLoginPublicPath && !token) {
        return NextResponse.redirect(new URL('/customer/login', request.nextUrl))
      }
    }

    if(isCustForgotPublicPath){
      if (isCustForgotPublicPath && token) {
        return NextResponse.redirect(new URL('/customer/dashboard', request.nextUrl))
      }

      if (!isCustForgotPublicPath && !token) {
        return NextResponse.redirect(new URL('/customer/forgot-password', request.nextUrl))
      }
    }


  }


}

export const config = {
  matcher: [
    '/backend/backend-dashboard/:path*', '/backend/backend-login',
    '/customer/dashboard/:path*','/customer/login',
  ],
}

