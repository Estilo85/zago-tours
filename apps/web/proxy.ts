import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from '@zagotours/types';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as Role;

  const roleAccessMap: Record<string, Role[]> = {
    '/super-admin': [Role.SUPER_ADMIN, Role.ADMIN],
    '/independent-agent': [Role.INDEPENDENT_AGENT],
    '/corporate-agent': [Role.COOPERATE_AGENT],
    '/adventurer': [Role.ADVENTURER],
    '/affiliate': [Role.AFFILIATE],
  };

  if (path === '/dashboard') {
    const roleHomePaths: Record<string, string> = {
      [Role.SUPER_ADMIN]: '/super-admin',
      [Role.ADMIN]: '/super-admin',
      [Role.INDEPENDENT_AGENT]: '/independent-agent',
      [Role.COOPERATE_AGENT]: '/corporate-agent',
      [Role.ADVENTURER]: '/adventurer',
      [Role.AFFILIATE]: '/affiliate',
    };
    return NextResponse.redirect(
      new URL(roleHomePaths[role] || '/adventurer', request.url),
    );
  }

  const restrictedPath = Object.keys(roleAccessMap).find((prefix) =>
    path.startsWith(prefix),
  );

  if (restrictedPath) {
    const allowedRoles = roleAccessMap[restrictedPath];
    if (!allowedRoles?.includes(role)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/super-admin/:path*',
    '/independent-agent/:path*',
    '/corporate-agent/:path*',
    '/adventurer/:path*',
    '/affiliate/:path*',
  ],
};
