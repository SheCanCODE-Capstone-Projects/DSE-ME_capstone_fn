import AuthLayout from "@/components/ui/AuthLayout";
import React from "react";


export default function AuthPagesLayout({ children }: { children: React.ReactNode }) {
  // Wrap all auth pages with AuthLayout
  return <AuthLayout>{children}</AuthLayout>;
}
