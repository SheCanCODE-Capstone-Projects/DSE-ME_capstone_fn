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
      
      if (response.token) {
        // Backend returns role at root level
        const userRole = response.role || response.user?.role;
        const userData = {
          id: response.user?.id || '',
          email: response.user?.email || formData.email,
          role: userRole,
          hasAccess: true
        };
        
        login(response.token, userData);
        localStorage.setItem('userEmail', formData.email);
        
        if (!userRole || userRole === 'UNASSIGNED') {
          toast('Please request access to continue', { icon: '⏳' });
          router.push('/request-access/start');
        } else if (userRole === 'ME_OFFICER') {
          toast.success('Welcome back, ME Officer!');
          router.push('/ME');
        } else if (userRole === 'FACILITATOR') {
          toast.success('Welcome back, Facilitator!');
          router.push('/overview');
        } else if (userRole === 'DONOR') {
          toast.success('Welcome back, Donor!');
          router.push('/donor');
        } else if (userRole === 'ADMIN') {
          toast.success('Welcome back, Admin!');
          router.push('/ME');
        } else {
          toast.success('Login successful!');
          router.push('/dashboard');
        }
      } else {
        toast.error('Login failed - no token received');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      
      if (errorMessage.includes('verify your email') || errorMessage.includes('not verified')) {
        toast.error('Please verify your email first');
      } else {
        toast.error(errorMessage);
      }
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