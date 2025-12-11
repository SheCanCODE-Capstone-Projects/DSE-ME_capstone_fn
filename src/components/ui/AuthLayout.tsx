import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
}

function AuthLayout({ children, leftContent }: AuthLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-sky-50 overflow-hidden">
     
      <div className="relative h-60 md:flex-1 md:h-auto rounded-b-[180px] md:rounded-b-none md:rounded-br-[800px] md:rounded-tr-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/image/image.png')] bg-cover bg-center"></div>

       
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 to-gray-700/80"></div>

        <div className="relative z-10 flex items-center h-full justify-center text-center px-4 md:justify-start md:text-left md:pl-16 md:pr-2">
          <div className="bg-white w-3 h-3 rounded-full absolute left-6 top-6 md:left-8 md:top-14"></div>

          {leftContent && <div className="text-white w-full">{leftContent}</div>}
        </div>
      </div>


      <div className="flex-1 relative flex justify-center items-center p-6 md:p-8">
        
        <div className="bg-gradient-to-b from-sky-900 to-gray-700 w-4 h-4 shadow-lg rounded-full absolute top-10 right-10 md:top-14 md:right-14"></div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
