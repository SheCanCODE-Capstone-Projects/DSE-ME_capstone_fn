"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { authApi } from '@/lib/authApi';
import toast from 'react-hot-toast';

function EmailVerifiedPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. No token provided.');
      return;
    }

    if (!isVerifying) {
      handleEmailVerification(token);
    }
  }, [searchParams, isVerifying]);

  const handleEmailVerification = async (token: string) => {
    if (isVerifying) return;
    
    setIsVerifying(true);
    try {
      const result = await authApi.verifyEmail(token);
      setStatus('success');
      const successMessage = typeof result === 'string' ? result : 'Email verified successfully!';
      setMessage(successMessage);
      toast.success('Email verified successfully!');
    } catch (error: unknown) {
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Email verification failed';
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  if (status === 'verifying') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
            <Loader className="w-6 h-6 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600">Verifying Email...</h2>
          <p className="text-gray-600 mt-2">
            Please wait while we verify your email address.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
          <p className="text-gray-600 mt-2">
            {message}
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">What's Next?</h3>
          <p className="text-sm text-green-700">
            Your email has been successfully verified. You can now log in to your account.
          </p>
        </div>
        
        <div className="flex justify-center">
          <PrimaryButton
            label="Go to Login"
            onClick={handleGoToLogin}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
          <XCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
        <p className="text-gray-600 mt-2">
          {message}
        </p>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-medium text-red-800 mb-2">What can you do?</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Check if the verification link is complete</li>
          <li>• Try requesting a new verification email</li>
          <li>• Contact support if the problem persists</li>
        </ul>
      </div>
      
      <div className="flex justify-center space-x-4">
        <PrimaryButton
          label="Go to Login"
          onClick={handleGoToLogin}
        />
      </div>
    </div>
  );
}

export default EmailVerifiedPage;