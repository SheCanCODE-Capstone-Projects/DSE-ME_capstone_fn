"use client";
import dynamic from 'next/dynamic';
import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
import { Shield } from 'lucide-react';

// Mark this component as not prerenderable since it uses useSearchParams
const VerifyOtpPageContent = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Navigate to reset password with token (OTP is the reset token)
      router.push(`/reset-password?token=${otpCode}&email=${encodeURIComponent(email)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify code';
      setError(errorMessage);
      console.error('Verify OTP error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = otp.every(digit => digit !== '');

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Verify Code</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter the 6-digit code sent to {email}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input 
                key={index} 
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text" 
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-[#0B609D] rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <PrimaryButton 
            label={isLoading ? 'Verifying...' : 'Verify Code'} 
            type="submit" 
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
      
      <div className="flex justify-center items-center space-x-4 text-sm">
        <button 
          type="button"
          onClick={handleResend}
          className="text-[#0B609D] hover:underline font-medium transition-colors"
        >
          Resend Code
        </button>
        <div className="text-gray-400">|</div>
        <button 
          type="button"
          onClick={() => router.push('/forgot-password')}
          className="text-[#0B609D] hover:underline font-medium transition-colors"
        >
          Change Email
        </button>
      </div>
    </div>
  );
};

// Export as dynamic component to skip prerendering
const VerifyOtpPage = dynamic(() => Promise.resolve(VerifyOtpPageContent), {
  ssr: false,
});

export default VerifyOtpPage;