"use client";
import AuthLayout from "@/components/ui/AuthLayout";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const getLeftContent = (pathname: string) => {
  switch (pathname) {
    case '/login':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>D</span>
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>S</span>
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>E</span>
              <span className="inline-block mx-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>&</span>
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>M</span>
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>E</span>
            </h1>
            <p className="text-sm md:text-base opacity-90 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              Digital Skills & Monitoring Evaluation Platform
            </p>
          </div>
          <p className="text-sm md:text-xl leading-relaxed">
            Track learner progress,<br/>
            monitor cohorts,<br/>
            manage program data,<br/>
            and access real-time insights<br/><br/>
            —all in one place.
          </p>
          <div className="text-sm md:text-base">
            <p>Don&apos;t have an account?</p>
            <Link href="/signup" className="text-white underline hover:text-gray-200 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      );
    case '/signup':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-0 md:space-y-6  md:space-x-0">
          <p className="text-sm md:text-xl leading-relaxed">
            Track learner progress,<br/>
            monitor cohorts,<br/>
            manage program data,<br/>
            and access real-time insights<br/><br/>
            —all in one place.
          </p>
          <div className="text-base">
            <p>Already have an account?</p>
            <Link href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Login
            </Link>
          </div>
        </div>
      );
    case '/reset-password':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-0 md:space-y-6  md:space-x-0">
          <p className="text-sm md:text-xl leading-relaxed">
            Create a new password<br/>
            for your account.<br/>
            Make it strong and secure.
          </p>
          <div className="text-base">
            <p>Remember your password?</p>
            <Link href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      );
    case '/forgot-password':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-0 md:space-y-6  md:space-x-0">
          <p className="text-sm md:text-xl leading-relaxed">
            Enter your email address<br/>
            and we&apos;ll send you an OTP<br/>
            to reset your password.
          </p>
          <div className="text-base">
            <p>Remember your password?</p>
            <Link href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      );
    case '/verify-otp':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-0 md:space-y-6  md:space-x-0">
          <p className="text-sm md:text-xl leading-relaxed">
            Enter the 6-digit code<br/>
            sent to your email<br/>
            to verify your identity.
          </p>
          <div className="text-base">
            <p>Need to change your email?</p>
            <Link href="/forgot-password" className="text-white underline hover:text-gray-200 font-medium">
              Go Back
            </Link>
          </div>
        </div>
      );
    case '/email-verification':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-4">
          <p className="text-sm md:text-xl leading-relaxed">
            Check your inbox<br/>
            and click the link<br/>
            to verify your email.<br/><br/>
            Can't find it?<br/>
            Check your spam folder.
          </p>
          <div className="text-sm md:text-base">
            <p>Wrong email address?</p>
            <Link href="/signup" className="text-white underline hover:text-gray-200 font-medium">
              Sign up again
            </Link>
          </div>
        </div>
      );
    case '/email-verified':
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-4">
          <p className="text-sm md:text-xl leading-relaxed">
            Your email has been<br/>
            successfully verified!<br/><br/>
            You can now access<br/>
            all platform features.
          </p>
          <div className="text-sm md:text-base">
            <p>Ready to get started?</p>
            <Link href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Login now
            </Link>
          </div>
        </div>
      );
      return (
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-0 md:space-y-6  md:space-x-0">
          <p className="text-sm md:text-xl leading-relaxed">
            Create a new password<br/>
            for your account.<br/>
            Make it strong and secure.
          </p>
          <div className="text-base">
            <p>Remember your password?</p>
            <Link href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function AuthPagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const leftContent = getLeftContent(pathname);
  
  return <AuthLayout leftContent={leftContent}>{children}</AuthLayout>;
}
