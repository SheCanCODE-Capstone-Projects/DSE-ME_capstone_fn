"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Email from '@/components/ui/InputEmail';
import PasswordInput from '@/components/ui/password';
import PrimaryButton from '@/components/PrimaryButton';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { LogIn } from 'lucide-react';
import { useLogin } from '@/hooks/auth/useLogin';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const loginMutation = useLogin();
  const { login } = useAuth();
  const router = useRouter();
  const isLoading = loginMutation.status === 'pending';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await loginMutation.mutateAsync(formData);
      login(response.token);
      
      
      localStorage.setItem('userEmail', formData.email);
      
     
      const allRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      const userRequest = allRequests.find((r: any) => r.userEmail === formData.email);
      
      if (userRequest) {
        if (userRequest.status === 'pending') {
          toast('Your access request is pending approval', { icon: '⏳' });
          router.push('/request-access/finish');
          return;
        } else if (userRequest.status === 'rejected') {
          toast.error('Your access request was rejected. Please contact support.');
          return;
        }
      }
      
      
      const user = response.user;
      
      if (!user?.role || user?.status === 'pending') {
        toast('Your access request is pending approval', { icon: '⏳' });
        router.push('/request-access/finish');
      } else if (user.role === 'me') {
        toast.success('Welcome back, ME Admin!');
        router.push('/ME');
      } else if (user.role === 'facilitator') {
        toast.success('Welcome back, Facilitator!');
        router.push('/overview');
      } else if (user.role === 'donor') {
        toast.success('Welcome back, Donor!');
        router.push('/donor');
      } else {
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
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
          <PrimaryButton 
            label={isLoading ? 'Signing In...' : 'Sign In'} 
            type="submit" 
            disabled={!isFormValid || isLoading} 
          />
        </div>
      </form>
      
      <div className="flex items-center my-3">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <GoogleLoginButton />
    </div>
  );
}

export default LoginPage