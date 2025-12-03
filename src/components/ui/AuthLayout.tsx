import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-sky-50">

      {/* Left gradient panel */}
      <div className="w-full md:w-1/3 h-64 md:h-auto bg-gradient-to-b shadow-lg from-sky-900 to-gray-700
                      flex justify-center relative rounded-br-[800px] rounded-tr-[800px]">
        
        <div className="bg-white w-4 h-4 rounded-full absolute left-24 top-14"></div>
      </div>

      {/* Right content area */}
      <div className="w-full md:w-2/3 flex justify-center relative p-6">
        
        <div className="bg-gradient-to-b from-sky-900 to-gray-700 w-4 h-4 shadow-lg rounded-full absolute top-14"></div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
