"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/profileContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function FacilitatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes('/overview')) return 'Overview';
    if (path.includes('/participants')) return 'Participants';
    if (path.includes('/attendance')) return 'Attendance';
    if (path.includes('/grades')) return 'Grades';
    if (path.includes('/surveys')) return 'Survey';
    if (path.includes('/settings')) return 'Settings';
    return 'Overview';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <div className="flex bg-[#f0f4f8]">
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
            />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar 
                onMenuClick={() => setSidebarOpen(true)} 
                pageTitle={getPageTitle(pathname)}
              />
              <main className="flex-1 md:ml-28 p-4 md:p-6 overflow-auto mt-20 pb-24 min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
