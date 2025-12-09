"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Email from '@/components/ui/InputEmail';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { LogIn } from 'lucide-react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="space-y-1">
      <div className="flex flex-col items-center mb-2">
        <div className="w-10 h-10 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full flex items-center justify-center mb-3">
          <LogIn className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center text-black">Sign In</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Email value={formData.email} onChange={handleChange} required />
        <PasswordInput name="password" value={formData.password} onChange={handleChange} required />
        
        <div className="text-right">
          <Link href="/forgot-password" className="text-xs text-[#0B609D] hover:underline transition-colors">
            Forgot Password?
          </Link>
        </div>
        
        <div className="flex justify-center pt-3">
          <PrimaryButton label="Sign In" type="submit" disabled={!isFormValid} />
        </div>
      </form>
      
      <div className="flex items-center my-1">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <GoogleLoginButton />
    </div>
  );
}

export default LoginPage