"use client";
import AuthLayout from "@/components/ui/AuthLayout";
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
            <a href="/signup" className="text-white underline hover:text-gray-200 font-medium">
              Sign up
            </a>
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
            <a href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Login
            </a>
          </div>
        </div>
      );
    case '/reset-password':
      return (
        <div>
          <p className="text-xl mb-8 leading-relaxed">
            Provide the email associated with your account <br/>  to receive  a password reset code.
          </p>
          <div className="text-base">
            <p>Remember your password?</p>
            <a href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </a>
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
            <a href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </a>
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
            <p>Didn&apos;t receive the code?</p>
            <a href="/reset-password" className="text-white underline hover:text-gray-200 font-medium">
              Resend Code
            </a>
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
            <a href="/login" className="text-white underline hover:text-gray-200 font-medium">
              Back to Login
            </a>
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
