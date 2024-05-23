import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Chỉ kiểm tra nếu yêu cầu không phải từ trang login
  if (req.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.next();
  }
  
  const token = req.cookies.get('access_token');

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manage-users/:path*', '/another-protected-page/:path*'],
};
