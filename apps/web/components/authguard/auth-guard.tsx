'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@zagotours/types';
import { useAuthSession } from '@/hooks/queries/auth/use-auth-session';
import { usePermissions } from '@/hooks/queries/auth/use-permissions';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: Role | Role[];
  fallbackUrl?: string;
}

export function AuthGuard({
  children,
  requiredRole,
  fallbackUrl = '/login',
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthSession();
  const { hasRole } = usePermissions();

  const hasRequiredRole = requiredRole ? hasRole(requiredRole) : true;

  useEffect(() => {
    // Not authenticated -> redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push(fallbackUrl);
    }

    // Authenticated but wrong role -> redirect to unauthorized
    if (!isLoading && isAuthenticated && requiredRole && !hasRequiredRole) {
      router.push('/unauthorized');
    }
  }, [
    isAuthenticated,
    isLoading,
    hasRequiredRole,
    router,
    fallbackUrl,
    requiredRole,
  ]);

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Wrong role
  if (requiredRole && !hasRequiredRole) {
    return null;
  }

  // All good, show content
  return <div>{children}</div>;
}
