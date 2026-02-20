"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import SidebarME from "@/components/SidebarME";
import NavbarME from "@/components/NavbarME";
import { AuthProvider } from "@/context/AuthContext";

import { useRouteProtection } from "@/hooks/useRouteProtection";

function MEContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthorized } = useRouteProtection('ME_OFFICER');

  const getPageTitle = (path: string) => {
    if (path.includes('ME/overviews')) return 'Overview';
    if (path.includes('ME/participants')) return 'Participants';
    if (path.includes('ME/attendance')) return 'Attendance';
    if (path.includes('ME/grades')) return 'Grades';
    if (path.includes('ME/facilitators')) return 'Facilitators';
    if (path.includes('ME/reports')) return 'Reports';
    if (path.includes('ME/settings')) return 'Settings';
    return 'Overview';
  };

  if (!isAuthorized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f8]">
      <NavbarME 
        onMenuClick={() => setSidebarOpen(true)} 
        pageTitle={getPageTitle(pathname)} 
      />
      <div className="flex flex-1">
        <SidebarME
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <main className="flex-1 md:ml-28 p-4 md:p-6 overflow-auto mt-16 pb-24">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function MELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MEContent>{children}</MEContent>
    </AuthProvider>
  );
}