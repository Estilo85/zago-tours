'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AdminRegisterDto,
} from '@zagotours/types';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
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
        throw new Error('Invalid credentials');
      }

      if (!result?.ok) {
        throw new Error('Invalid credentials');
      }

      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      router.push('/dashboard');
      router.refresh();
    },
    onError: () => {
      toaster.create({
        title: 'Login Failed',
        description: 'Invalid email or password',
        type: 'error',
      });
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
    onError: () => {
      toaster.create({
        title: 'Registration Failed',
        description: 'Unable to create account. Please try again.',
        type: 'error',
      });
    },
  });

  // --- ADMIN REGISTER MUTATION ---
  const registerAdmin = useMutation({
    mutationFn: (data: AdminRegisterDto) =>
      apiRequest(API_ENDPOINTS.AUTH.REGISTER_ADMIN, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toaster.create({
        title: 'Failed',
        description: 'Unable to create admin account',
        type: 'error',
      });
    },
  });

  // --- LOGOUT ---
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    queryClient.clear();
  };

  return {
    // Login
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,

    // Register
    register: registerMutation.mutate,
    registerAdmin: registerAdmin.mutate,
    isRegisteringAdmin: registerAdmin.isPending,
    isRegistering: registerMutation.isPending,

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
        description:
          'If an account exists, you will receive a password reset link',
        type: 'success',
      });
    },
    onError: () => {
      // Always show success to prevent user enumeration
      toaster.create({
        title: 'Email Sent',
        description:
          'If an account exists, you will receive a password reset link',
        type: 'success',
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
    onError: () => {
      toaster.create({
        title: 'Reset Failed',
        description: 'Invalid or expired reset link',
        type: 'error',
      });
    },
  });

  return {
    // Forgot Password exports
    sendResetLink: forgotPassword.mutate,
    isSendingLink: forgotPassword.isPending,

    // Reset Password exports
    resetPassword: resetPassword.mutate,
    isResetting: resetPassword.isPending,
  };
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => apiRequest(API_ENDPOINTS.AUTH.ME),
    staleTime: 5 * 60 * 1000,
  });
}
