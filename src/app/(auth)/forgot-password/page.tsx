"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Email from '@/components/ui/InputEmail';
import PrimaryButton from '@/components/PrimaryButton';
import { KeyRound } from 'lucide-react';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
          We&apos;ve sent an OTP to {email}
        </p>
        
        <div className="flex justify-center">
          <PrimaryButton 
            label="Back to Login" 
            onClick={() => router.push('/login')} 
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
          Enter your email, we will send OTP in the email and follow instructions
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Email value={email} onChange={handleChange} required />
        
        <div className="flex justify-center pt-3">
          <PrimaryButton label="Send OTP" type="submit" disabled={!isFormValid} />
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage