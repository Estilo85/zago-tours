'use client';

import { LoginForm } from '@/components/auth/login/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <LoginForm isLoading={false} onSubmit={() => {}} />
    </div>
  );
}
