'use client';

import { LoginForm } from '@/components/auth/login/login-form';

export default function LoginPage() {
  return (
    <div>
      <LoginForm isLoading={false} onSubmit={() => {}} />
    </div>
  );
}
