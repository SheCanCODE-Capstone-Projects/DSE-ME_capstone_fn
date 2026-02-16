"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      router.replace(`/email-verified?token=${token}`);
    } else {
      router.replace('/login');
    }
  }, [router, searchParams]);

  return null;
}
