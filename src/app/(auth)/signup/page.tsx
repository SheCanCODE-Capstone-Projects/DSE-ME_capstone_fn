"use client";
import React, { useState } from 'react';
import Email from '@/components/ui/InputEmail';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import { UserPlus } from 'lucide-react';
import GoogleSignupButton from '@/components/GoogleSignupButton';

function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const isFormValid = formData.email && formData.password && formData.confirmPassword;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Create Account</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Email value={formData.email} onChange={handleChange} required />
        <PasswordInput name="password" value={formData.password} onChange={handleChange} required />
        <PasswordInput name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <div className="flex justify-center pt-3">
          <PrimaryButton label="Create Account" type="submit" disabled={!isFormValid} />
        </div>
      </form>
      
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <GoogleSignupButton/>
    </div>
  );
}

export default SignupPage