// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from '@zagotours/types';

// Role home paths
const ROLE_HOME: Record<Role, string> = {
  [Role.SUPER_ADMIN]: '/admin',
  [Role.ADMIN]: '/admin',
  [Role.INDEPENDENT_AGENT]: '/independent-agent',
  [Role.COOPERATE_AGENT]: '/corporate-agent',
  [Role.ADVENTURER]: '/adventurer',
  [Role.AFFILIATE]: '/affiliate',
};

// Role-based access map
const ROLE_ACCESS: Record<string, Role[]> = {
  '/admin': [Role.SUPER_ADMIN, Role.ADMIN],
  '/independent-agent': [Role.INDEPENDENT_AGENT],
  '/corporate-agent': [Role.COOPERATE_AGENT],
  '/adventurer': [Role.ADVENTURER],
  '/affiliate': [Role.AFFILIATE],
};

// Routes that require authentication but are not role-specific
const AUTH_REQUIRED_ROUTES = ['/posts', '/community'];

// Public routes (no auth needed)
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/reset-password',
  '/forgot-password',
];

// Middleware
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (PUBLIC_ROUTES.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Get token
  const token = await getToken({ req: request });
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as Role;

  //  Handle role-restricted routes
  const matchedRoleRoute = Object.keys(ROLE_ACCESS).find((prefix) =>
    path.startsWith(prefix),
  );

  if (matchedRoleRoute) {
    const allowedRoles = ROLE_ACCESS[matchedRoleRoute];
    if (!allowedRoles?.includes(role)) {
      // Redirect unauthorized users to their dashboard
      return NextResponse.redirect(
        new URL(ROLE_HOME[role] || '/adventurer', request.url),
      );
    }
    return NextResponse.next();
  }

  //  Handle general auth-required routes
  if (AUTH_REQUIRED_ROUTES.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Everything else is public
  return NextResponse.next();
}

// Dashboard routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/independent-agent/:path*',
    '/corporate-agent/:path*',
    '/adventurer/:path*',
    '/affiliate/:path*',
    '/community/:path*',
  ],
};
