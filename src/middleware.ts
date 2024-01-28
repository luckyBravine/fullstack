import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
 

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname

  // const isPublicPath = path === '/login' || path === '/signup' || path === '/'

  // const token = request.cookies.get("token")?.value || "";

  // if(isPublicPath && token){
  //   return NextResponse.redirect(new URL('/', request.nextUrl))
  //   console.log("hello")
  // } 
  
  // if(!isPublicPath && !token){
  //   return NextResponse.redirect(new URL('/', request.nextUrl))
  //   console.log("hello 1")
  // } 
  // try {
  //   console.log("welcome")
  //   const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as { role: string };
  //   switch (decodedToken.role.toUpperCase()) {
  //     case 'STUDENT':
  //       if (!request.nextUrl.pathname.startsWith('/moderator')) {
  //         return NextResponse.redirect(new URL('/student', request.url));
  //         console.log("student")
  //       }
  //       break;
  //     case 'ADMIN':
  //       if (
  //         !request.nextUrl.pathname.startsWith('/student')
  //       ) {
  //         return NextResponse.redirect(new URL('/moderator', request.url));
  //         console.log("admin")
  //       }
  //       break;
  //     default:
  //       return NextResponse.redirect(new URL('/', request.url));
  //       console.log("home")
  //   }
  // } catch (error: any) {
  //   // Handle invalid or expired token
  //   return NextResponse.redirect(new URL('/', request.url));
  //   console.log("there is na error", error)
  // }
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/student', 
    '/moderator'
]
}