import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname

  if (request.nextUrl.pathname.startsWith('/backend')) {
    const isPublicPath = path === '/backend/backend-login';

    const token = request.cookies.get('admin-token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/backend/backend-dashboard', request.nextUrl))
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/backend/backend-login', request.nextUrl))
    }
  }

  if (request.nextUrl.pathname.startsWith('/customer')) {
    const isPublicPath = path === '/customer/login';

    const token = request.cookies.get('customer-token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/customer/dashboard', request.nextUrl))
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/customer/login', request.nextUrl))
    }
  }
    

}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/backend-dashboard/:path*', '/backend-login',
//   ],
// }

