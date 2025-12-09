"use client";
import AuthLayout from "@/components/ui/AuthLayout";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const getLeftContent = (pathname: string) => {
  switch (pathname) {
    case '/login':
      return (
        <div>
          <p className="text-xl mb-8 leading-relaxed">
            Track learner progress,<br/>
            monitor cohorts,<br/>
            manage program data,<br/>
            and access real-time insights<br/><br/>
            —all in one place.
          </p>
          <div className="text-base">
            <p>Don&apos;t have an account?</p>
            <Link href="/signup" className="text-white underline hover:text-gray-200 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      );
    case '/signup':
      return (
        <div>
          <p className="text-xl mb-8 leading-relaxed">
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
        <div>
          <p className="text-xl mb-8 leading-relaxed">
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
        <div>
          <p className="text-xl mb-8 leading-relaxed">
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
        <div>
          <p className="text-xl mb-8 leading-relaxed">
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
    case '/new-password':
      return (
        <div>
          <p className="text-xl mb-8 leading-relaxed">
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
