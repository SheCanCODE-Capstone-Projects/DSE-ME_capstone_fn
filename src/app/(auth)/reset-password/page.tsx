"use client";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import { Lock } from 'lucide-react';
import { authApi } from '@/lib/authApi';

const ResetPasswordPageContent = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await authApi.resetPassword(token, formData.password);
      console.log('Reset password response:', response);
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      console.error('Reset password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.password && formData.confirmPassword && 
                     formData.password === formData.confirmPassword &&
                     formData.password.length >= 6;

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-gray-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black">Password Reset</h2>
        </div>
        
        <p className="text-gray-600">
          Your password has been successfully reset!
        </p>
        
        <div className="flex justify-center">
          <PrimaryButton 
            label="Sign In" 
            onClick={() => router.push('/login')} 
          />
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-gray-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black">Invalid Link</h2>
        </div>
        
        <p className="text-gray-600">
          This password reset link is invalid or has expired.
        </p>
        
        <div className="flex justify-center">
          <PrimaryButton 
            label="Request New Link" 
            onClick={() => router.push('/forgot-password')} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your new password below.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput 
          name="password" 
          label="New Password"
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        <PasswordInput 
          name="confirmPassword" 
          label="Confirm New Password"
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
        
        {formData.password && formData.password.length < 6 && (
          <p className="text-sm text-red-600">Password must be at least 6 characters</p>
        )}
        
        <div className="flex justify-center pt-3">
          <PrimaryButton label={isLoading ? 'Resetting...' : 'Reset Password'} type="submit" disabled={!isFormValid || isLoading} />
        </div>
      </form>
    </div>
  );
};

// Export as dynamic component to skip prerendering
const ResetPasswordPage = dynamic(() => Promise.resolve(ResetPasswordPageContent), {
  ssr: false,
});

export default ResetPasswordPage