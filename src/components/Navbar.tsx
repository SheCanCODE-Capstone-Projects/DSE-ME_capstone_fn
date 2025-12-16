"use client"

import { Bell, Menu } from "lucide-react"
import { useEffect, useState } from "react"

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
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

  return (
    <header className="px-4 md:px-8 py-4 md:py-8 flex items-center justify-between" >
      <div className="flex items-center gap-2 md:gap-4">
        
        {mounted && isMobile && (
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} style={{ color: '#34597E' }} />
          </button>
        )}
        
        <div>
          <h1 className="text-lg md:text-2xl font-bold" style={{ color: '#34597E' }}>Facilitator Dashboard</h1>
          <p className="text-base md:text-xl py-1 md:py-2" style={{ color: '#796666' }}>Overview</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        
        <div className="relative cursor-pointer">
          <Bell size={20} className="md:w-6 md:h-6" style={{ color: '#34597E' }} />
        </div>

        
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-sky-700 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">
            DI
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">diane</p>
            <p className="text-xs" style={{ color: '#0B609D' }}>diane@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}