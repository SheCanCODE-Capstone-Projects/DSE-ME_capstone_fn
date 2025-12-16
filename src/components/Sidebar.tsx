'use client';

import {
  Home,
  Users,
  List,
  PencilLine,
  Radar,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Overview', icon: Home, href: '/overview' },
  { label: 'Participants', icon: Users, href: '/participants' },
  { label: 'Attendance', icon: List, href: '/attendance' },
  { label: 'Grades', icon: PencilLine, href: '/grades' },
  { label: 'Survey', icon: Radar, href: '/survey' },
];

const settingsItem = { label: 'Settings', icon: Settings, href: '/settings' };

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mounted) setMounted(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mounted]);

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40" 
          onClick={onClose}
        />
      )}
      
      <aside className={`${!mounted ? 'hidden' : ''} ${isMobile ? 'fixed top-0 left-0 h-full w-72 shadow-xl' : 'h-[calc(100vh-2rem)] w-20 border-r border-gray-200 m-4'} flex flex-col ${isMobile ? 'py-6' : 'items-center py-4'} transition-transform duration-300 ease-in-out ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} ${isMobile ? 'fixed' : 'relative'} z-50`} style={{ backgroundColor: '#EEF3FD', borderRadius: isMobile ? '0' : '40px', boxShadow: isMobile ? '2px 0 10px rgba(0, 0, 0, 0.1)' : '8px 0 32px rgba(0, 0, 0, 0.4)' }}>
        <div className={`flex flex-col ${isMobile ? 'px-4 space-y-1' : 'items-center space-y-6'}`}>
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link key={label} href={href} className={`flex ${isMobile ? 'items-center gap-4 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-50' : 'flex-col items-center'} transition-colors`} onClick={handleNavClick}>
              {isMobile ? (
                <>
                  <Icon className="w-6 h-6" style={{ color: '#0B609D' }} />
                  <span className="text-sm font-medium" style={{ color: '#0B609D' }}>{label}</span>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full transition-all bg-white hover:bg-[#0B609D] group">
                    <Icon className="w-6 h-6 transition-colors text-[#0B609D] group-hover:text-white" />
                  </div>
                  <span className="text-[12px] mt-1" style={{ color: '#0B609D' }}>{label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
        
        <div className={`mt-auto ${isMobile ? 'px-4' : ''}`}>
          <Link href={settingsItem.href} className={`flex ${isMobile ? 'items-center gap-4 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-50' : 'flex-col items-center'} transition-colors`} onClick={handleNavClick}>
            {isMobile ? (
              <>
                <settingsItem.icon className="w-6 h-6" style={{ color: '#0B609D' }} />
                <span className="text-sm font-medium" style={{ color: '#0B609D' }}>{settingsItem.label}</span>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-full transition-all bg-white hover:bg-[#0B609D] group">
                  <settingsItem.icon className="w-6 h-6 transition-colors text-[#0B609D] group-hover:text-white" />
                </div>
                <span className="text-[10px] mt-1" style={{ color: '#0B609D' }}>{settingsItem.label}</span>
              </>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}