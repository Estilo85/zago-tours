import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { LoginDto, RegisterDto } from '@zagotours/types';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { authKeys } from './query-keys';
import { Role } from '@zagotours/types';
import { getRedirectUrlByRole } from '@/lib/auth-redirect';

// ============================================
// LOGIN, REGISTER, AND LOGOUT
// ============================================
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // --- LOGIN MUTATION ---
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginDto) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (!result?.ok) {
        throw new Error('Login failed');
      }

      return result;
    },
    onSuccess: async () => {
      //  Fetch the LATEST session data
      const session = await getSession();
      const userRole = session?.user?.role as Role;

      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      if (userRole) {
        const destination = getRedirectUrlByRole(userRole);

        toaster.create({
          title: 'Welcome back!',
          description: `Logged in as ${userRole}`,
          type: 'success',
        });

        router.push(destination);
      } else {
        router.push('/dashboard');
      }

      router.refresh();
    },
  });

  // --- REGISTER MUTATION ---
  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) =>
      apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toaster.create({
        title: 'Account Created',
        description: 'Please check your email to verify your account.',
        type: 'success',
      });
      router.push('/login');
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Registration Failed',
        description: error.message || 'Failed to create account',
        type: 'error',
      });
    },
  });

  // --- LOGOUT ---
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    queryClient.clear();

    toaster.create({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
      type: 'info',
    });
  };

  return {
    // Authentication methods
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,

    isRegistering: registerMutation.isPending,
    logout: handleLogout,
  };
}
