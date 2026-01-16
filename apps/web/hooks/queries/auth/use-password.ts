import { useMutation } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { ForgotPasswordDto, ResetPasswordDto } from '@zagotours/types';

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

    // Reset Password exports
    resetPassword: resetPassword.mutate,
    isResetting: resetPassword.isPending,
  };
}
