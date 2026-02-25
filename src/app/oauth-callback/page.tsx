"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const message = searchParams.get('message');

      if (error) {
        toast.error(error);
        router.push('/login');
        return;
      }

      if (message) {
        toast(message, { icon: '📧' });
        router.push('/email-verification');
        return;
      }

      if (code) {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088/api';
          const response = await fetch(`${backendUrl}/auth/google?code=${code}`);
          const data = await response.json();

          if (data.token) {
            const userData = {
              id: data.userId || '',
              email: data.email || '',
              role: data.role || 'UNASSIGNED',
              hasAccess: data.role !== 'UNASSIGNED',
              organizationName: data.organizationName,
              organizationId: data.organizationId,
              locationName: data.locationName,
              locationId: data.locationId
            };

            login(data.token, userData);
            toast.success('Login successful!');

            if (data.role === 'UNASSIGNED') {
              router.push('/request-access/start');
            } else if (data.role === 'ME_OFFICER') {
              router.push('/ME/overviews');
            } else if (data.role === 'FACILITATOR') {
              router.push('/facilitator/overview');
            } else if (data.role === 'DONOR') {
              router.push('/donor/overview');
            } else {
              router.push('/dashboard');
            }
          } else if (data.error) {
            toast.error(data.error);
            router.push('/login');
          } else {
            toast.error('Login failed');
            router.push('/login');
          }
        } catch (error) {
          console.error('OAuth callback error:', error);
          toast.error('Authentication failed');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B609D] mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
