'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RegistrationForm from '@/components/auth/register-form';
import { PublicRole } from '@zagotours/types';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleRegistration = async (data: {
    role: PublicRole | null;
    [key: string]: any;
  }) => {
    setError(null);
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistration} error={error} />
    </div>
  );
}
