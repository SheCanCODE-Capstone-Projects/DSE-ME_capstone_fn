"use client";
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyRedirectContent() {
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

export default function VerifyRedirect() {
  return (
    <Suspense fallback={null}>
      <VerifyRedirectContent />
    </Suspense>
  );
}