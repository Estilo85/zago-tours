import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from '@zagotours/types';

const ROLE_HOME: Record<Role, string> = {
  [Role.SUPER_ADMIN]: '/admin',
  [Role.ADMIN]: '/admin',
  [Role.INDEPENDENT_AGENT]: '/independent-agent',
  [Role.COOPERATE_AGENT]: '/corporate-agent',
  [Role.ADVENTURER]: '/adventurer',
  [Role.AFFILIATE]: '/affiliate',
};

const ROLE_ACCESS: Record<string, Role[]> = {
  '/admin': [Role.SUPER_ADMIN, Role.ADMIN],
  '/independent-agent': [Role.INDEPENDENT_AGENT],
  '/corporate-agent': [Role.COOPERATE_AGENT],
  '/adventurer': [Role.ADVENTURER],
  '/affiliate': [Role.AFFILIATE],
};

const AUTH_REQUIRED_ROUTES = ['/posts'];

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/reset-password',
  '/forgot-password',
];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (PUBLIC_ROUTES.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as Role;
  const roleHome = ROLE_HOME[role];

  if (path === '/dashboard') {
    if (!roleHome) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  const matchedRoleRoute = Object.keys(ROLE_ACCESS).find((prefix) =>
    path.startsWith(prefix),
  );

  if (matchedRoleRoute) {
    const allowedRoles = ROLE_ACCESS[matchedRoleRoute];
    if (!allowedRoles?.includes(role)) {
      if (!roleHome)
        return NextResponse.redirect(new URL('/login', request.url));
      return NextResponse.redirect(new URL(roleHome, request.url));
    }
    return NextResponse.next();
  }

  if (AUTH_REQUIRED_ROUTES.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin/:path*',
    '/independent-agent/:path*',
    '/corporate-agent/:path*',
    '/adventurer/:path*',
    '/affiliate/:path*',
    '/community/:path*',
  ],
};
