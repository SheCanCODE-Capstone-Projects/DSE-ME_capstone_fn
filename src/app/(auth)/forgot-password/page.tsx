"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Email from '@/components/ui/InputEmail';
import PrimaryButton from '@/components/PrimaryButton';
import { KeyRound } from 'lucide-react';
import { authApi } from '@/lib/authApi';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Submitting forgot password request for:', email);
      const response = await authApi.forgotPassword(email);
      console.log('Forgot password response:', response);
      setIsSubmitted(true);
    } catch (err) {
      let errorMessage = 'Failed to send reset code';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('Forgot password error message:', err.message);
        console.error('Forgot password error stack:', err.stack);
      } else {
        console.error('Forgot password error (unknown type):', err);
      }
      
      // Check if it's a connection error
      if (errorMessage.includes('Cannot connect to backend')) {
        errorMessage = 'Backend is not running. Please check if the server is online.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '';

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-700 to-gray-500 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black">Check Your Email</h2>
        </div>
        
        <p className="text-gray-600">
          We&apos;ve sent a reset code to {email}
        </p>
        
        <div className="flex justify-center">
          <PrimaryButton 
            label="Enter Code" 
            onClick={() => router.push(`/verify-otp?email=${encodeURIComponent(email)}`)} 
          />
        </div>
        
        <p className="text-sm">
          Didn&apos;t receive the email?{' '}
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-[#0B609D] hover:underline"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <KeyRound className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your email, we will send reset code in the email and follow instructions
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded space-y-2">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          {error.includes('Cannot connect') && (
            <div className="mt-3 pt-3 border-t border-red-200 text-sm">
              <p className="font-semibold mb-1">Debugging tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check if backend is running on http://localhost:8088</li>
                <li>Check browser console for more details (F12)</li>
                <li>Check backend logs for errors</li>
              </ul>
            </div>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Email value={email} onChange={handleChange} required />
        
        <div className="flex justify-center pt-3">
          <PrimaryButton label={isLoading ? 'Sending...' : 'Send Reset Code'} type="submit" disabled={!isFormValid || isLoading} />
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage