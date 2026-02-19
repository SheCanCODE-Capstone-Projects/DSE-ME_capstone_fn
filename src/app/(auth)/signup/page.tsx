'use client';

import React, { useState } from 'react';
import Email from '@/components/ui/InputEmail';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import { UserPlus } from 'lucide-react';
import GoogleSignupButton from '@/components/GoogleSignupButton';
import { useSignup } from '@/hooks/auth/useSignup';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types/auth';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const signupMutation = useSignup();
  const router = useRouter();

 
  const isLoading = signupMutation.status === 'pending';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      const message = await signupMutation.mutateAsync(formData);

      localStorage.setItem('pendingVerificationEmail', formData.email);
      toast.success(message || 'Account created! Please verify your email.');
      router.push('/email-verification');
    } catch (err) {
      const error = err as Error & { message?: string };
      // If email sending fails, inform user but allow them to proceed
      if (error.message?.includes('Failed to send verification email')) {
        toast.error('Email service unavailable. Please contact support or try manual verification.');
        localStorage.setItem('pendingVerificationEmail', formData.email);
        router.push('/email-verification');
      } else {
        toast.error(error.message || 'Signup failed');
      }
    }
  };

  const isFormValid =
    formData.email && formData.password && formData.confirmPassword && formData.firstName && formData.lastName;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
     
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">
          Create Account
        </h2>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B609D]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B609D]"
              required
            />
          </div>
        </div>
        <Email
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center pt-3">
          <PrimaryButton
            label={isLoading ? 'Creating...' : 'Create Account'}
            type="submit"
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>

      
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      
      <GoogleSignupButton />
    </div>
  );
}
