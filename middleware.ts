import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';




export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const url = request.nextUrl.clone();




  return NextResponse.next();
}

// Configure the routes to which the middleware applies
// export const config = {
//   matcher: [
//     '/login',
//     '/',
//     '/catalog',
//     '/contact-us',
//     '/profile',
//     '/auth/login',  // You can add more auth routes if necessary
//     '/auth/register', // Add other auth routes if necessary
//   ],
// };


