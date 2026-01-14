"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import NavbarDonor from "@/components/NavbarDonor";
import SidebarDonor from "@/components/SidebarDonor";
export default function MELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes('donor/dashboard')) return 'Dashboard';
    if (path.includes('donor/partners')) return 'Partners';
    if (path.includes('donor/analytics')) return 'Analytics';
    if (path.includes('donor/reports')) return 'Reports';
  
    return 'Overview';
  };

  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#f0f4f8]">
        <NavbarDonor 
          onMenuClick={() => setSidebarOpen(true)} 
          pageTitle={getPageTitle(pathname)} 
        />
        <div className="flex flex-1">
          <SidebarDonor
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          <main className="flex-1 md:ml-28 p-4 md:p-6 overflow-auto mt-16 pb-24">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  </QueryClientProvider>
);

}