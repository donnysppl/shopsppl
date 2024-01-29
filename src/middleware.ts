import jwt_decode from 'jwt-decode';
import { NextRequest, NextResponse } from "next/server";
import { AdminTokenDecode, postRoutes, serviceRoutes, superAdminRoutes } from "./helpers/interFace";

export const dynamic = 'force-dynamic'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const searchParams = request.nextUrl.searchParams;
  const testQuery = searchParams.get('test');


  if (request.nextUrl.pathname.startsWith('/backend')) {
    const isPublicPath = path === '/backend/backend-login';


    const token = request.cookies.get('admin-token')?.value;

    if (token) {
      const userTokenData: AdminTokenDecode = jwt_decode(token as string);

      // if token is expired then redirect to login page
      if (userTokenData.exp < Date.now() / 1000) {
        url.pathname = "/backend/backend-login";
        return NextResponse.redirect(url);
      }

      if (!testQuery) {
        if (userTokenData.adminrole === 'Post Admin') {
          if (postRoutes.includes(pathname)) {
            return NextResponse.redirect(url + '?test=true');
          }
          else {
            return NextResponse.redirect(new URL('/backend/backend-dashboard/not-found?test=true', request.nextUrl))
          }
        }
        else if (userTokenData.adminrole === 'Service Admin') {
          if (serviceRoutes.includes(pathname)) {
            return NextResponse.redirect(url + '?test=true');
          }
          else {
            return NextResponse.redirect(new URL('/backend/backend-dashboard/not-found?test=true', request.nextUrl))
          }
        }

      }

    }

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

    if (isCustForgotPublicPath) {
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
    '/customer/dashboard/:path*', '/customer/login',
  ],
}

