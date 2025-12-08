"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import { Lock } from 'lucide-react';

function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: Replace with actual API call
    // await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify(formData) });
    console.log('Reset password:', formData);
    setIsSubmitted(true);
  };

  const isFormValid = formData.password && formData.confirmPassword && 
                     formData.password === formData.confirmPassword;

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
        
        <div className="flex justify-center pt-3">
          <PrimaryButton label="Reset Password" type="submit" disabled={!isFormValid} />
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordPage