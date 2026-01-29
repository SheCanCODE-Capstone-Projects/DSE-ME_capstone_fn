'use client';

import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#EEF3FD' }}>
     
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-[#0B609D] to-gray-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-gray-400 to-[#0B609D] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-r from-gray-500 to-[#0B609D] rounded-full opacity-25 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-lg w-full text-center p-8 relative z-10">
        
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#0B609D] to-gray-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        
        <h2 className="text-4xl font-bold mb-6 animate-fade-in" style={{ color: '#34597E' }}>
          Oops! Lost in Space
        </h2>

        
        <p className="text-xl mb-12 leading-relaxed" style={{ color: '#796666' }}>
          The page you are looking for has drifted away into the digital void.
        </p>

        
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #0B609D, #666666)',
            color: 'white'
          }}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold">Take Me Back</span>
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}