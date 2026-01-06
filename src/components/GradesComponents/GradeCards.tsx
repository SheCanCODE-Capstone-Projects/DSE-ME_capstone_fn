"use client";

import { LucideIcon, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  href: string; 
}

export default function GradeCards({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
}: DashboardCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href); 
  };

  return (
    <div className="font-sans bg-white rounded-2xl shadow-sm p-6 px-8 flex flex-col justify-between hover:shadow-md transition">
    
      <div className="w-14 h-14 flex items-center justify-center rounded-full text-sky-700 mb-4"
        style={{ backgroundColor: "#EEF3FD" }}>
        <Icon size={26} />
      </div>

      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-sky-700 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      
      <button onClick={handleClick} className="w-full bg-sky-700 text-white py-3 rounded-full font-semibold hover:bg-sky-800 transition flex items-center justify-center gap-2">
        {buttonText}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
