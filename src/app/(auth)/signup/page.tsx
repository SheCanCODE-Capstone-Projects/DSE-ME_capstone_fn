'use client';

import React, { useState } from 'react';
import Email from '@/components/ui/InputEmail';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import { UserPlus } from 'lucide-react';
import GoogleSignupButton from '@/components/GoogleSignupButton';
import { useSignup } from '@/hooks/auth/useSignup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types/auth';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const signupMutation = useSignup();
  const { login } = useAuth();
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
      const response = await signupMutation.mutateAsync(formData);

      // Store token and email
      localStorage.setItem('token', response.token);
      localStorage.setItem('userEmail', formData.email);

      toast.success('Account created successfully!');
      router.push('/request-access/start');
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    }
  };

  const isFormValid =
    formData.email && formData.password && formData.confirmPassword;

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
