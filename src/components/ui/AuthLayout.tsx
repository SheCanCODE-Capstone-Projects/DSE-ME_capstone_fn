import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
}

function AuthLayout({ children, leftContent }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-sky-50">

    
      <div className="w-full md:w-1/2 h-64 md:h-auto relative rounded-br-[800px] rounded-tr-[800px] overflow-hidden">
     
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100')] bg-cover bg-center"></div>
        
    
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 to-gray-700/80"></div>
    
    
        <div className="relative z-10 flex items-center h-full pl-16 pr-2">
          <div className="bg-white w-4 h-4 rounded-full absolute left-8 top-14"></div>
          {leftContent && (
            <div className="text-white text-left w-full">
              {leftContent}
            </div>
          )}
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex justify-center items-center relative p-8">
        <div className="bg-gradient-to-b from-sky-900 to-gray-700 w-4 h-4 shadow-lg rounded-full absolute top-14 right-14"></div>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
