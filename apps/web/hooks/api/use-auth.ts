import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  Role,
} from '@zagotours/types';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { getRedirectUrlByRole } from '@/lib/auth-redirect';
import { authKeys } from './query-keys';

// ============================================
// AUTH HOOK (Login, Register, Logout)
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
      const session = await getSession();
      const userRole = session?.user?.role as Role;

      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      if (userRole) {
        const destination = getRedirectUrlByRole(userRole);

        toaster.create({
          title: 'Welcome back!',
          description: `Logged in`,
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
    // Login
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: handleLogout,
  };
}

// ============================================
// PASSWORD HOOK (Forgot, Reset)
// ============================================
export function usePassword() {
  // --- Forgot Password Mutation ---
  const forgotPassword = useMutation({
    mutationFn: async (data: ForgotPasswordDto) => {
      return apiRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toaster.create({
        title: 'Email Sent',
        description: 'Please check your email for password reset instructions',
        type: 'success',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Failed to Send Email',
        description: error.message,
        type: 'error',
      });
    },
  });

  // --- Reset Password Mutation ---
  const resetPassword = useMutation({
    mutationFn: async (data: ResetPasswordDto) => {
      return apiRequest(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toaster.create({
        title: 'Password Reset',
        description: 'Your password has been reset successfully',
        type: 'success',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Reset Failed',
        description: error.message,
        type: 'error',
      });
    },
  });

  return {
    // Forgot Password exports
    sendResetLink: forgotPassword.mutate,
    isSendingLink: forgotPassword.isPending,
    forgotPasswordError: forgotPassword.error,

    // Reset Password exports
    resetPassword: resetPassword.mutate,
    isResetting: resetPassword.isPending,
    resetPasswordError: resetPassword.error,
  };
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => apiRequest(API_ENDPOINTS.AUTH.ME),
    staleTime: 5 * 60 * 1000,
  });
}
