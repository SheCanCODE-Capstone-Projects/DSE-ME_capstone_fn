"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import SidebarME from "@/components/SidebarME";
import NavbarME from "@/components/NavbarME";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
export default function MELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes('ME/overview')) return 'Overview';
    if (path.includes('ME/participants')) return 'Participants';
    if (path.includes('ME/attendance')) return 'Attendance';
    if (path.includes('ME/grades')) return 'Grades';
    if (path.includes('ME/surveys')) return 'Survey';
    if (path.includes('ME/facilitators')) return 'Facilitators';
    if (path.includes('ME/settings')) return 'Settings';
    return 'Overview';
  };

  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className="flex bg-[#f0f4f8]">
        <SidebarME
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <main className="flex-1 md:ml-28 p-4 md:p-6 overflow-auto mt-16 pb-24 min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  </QueryClientProvider>
);

}