"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { authApi } from '@/lib/authApi';
import toast from 'react-hot-toast';

function EmailVerificationPage() {
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingVerificationEmail');
    if (!pendingEmail) {
      router.push('/signup');
      return;
    }
    setEmail(pendingEmail);

    const token = searchParams.get('token');
    if (token) {
      handleEmailVerification(token);
    }
  }, [router, searchParams]);

  const handleEmailVerification = async (token: string) => {
    try {
      const message = await authApi.verifyEmail(token);
      setVerificationStatus('success');
      toast.success(message || 'Email verified successfully!');
      
      localStorage.removeItem('pendingVerificationEmail');
      localStorage.setItem('userEmail', email);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      setVerificationStatus('error');
      toast.error(error.message || 'Email verification failed');
    }
  };

  const handleResend = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      const message = await authApi.resendVerification(email);
      toast.success(message || 'Verification email sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (verificationStatus === 'success') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
          <p className="text-gray-600 mt-2">
            Your email has been successfully verified. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Check Your Email</h2>
        <p className="text-gray-600 text-center mt-2">
          We've sent a verification link to <br />
          <span className="font-medium text-[#0B609D]">{email}</span>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Check your email inbox</li>
          <li>2. Click the verification link</li>
          <li>3. You'll be taken to the verification page</li>
          <li>4. Then you can login to your account</li>
        </ol>
      </div>
      
      <div className="flex justify-center items-center space-x-4 text-sm">
        <button 
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-[#0B609D] hover:underline font-medium transition-colors disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend Email'}
        </button>
        <div className="text-gray-400">|</div>
        <button 
          type="button"
          onClick={() => router.push('/signup')}
          className="text-[#0B609D] hover:underline font-medium transition-colors"
        >
          Change Email
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationPage;