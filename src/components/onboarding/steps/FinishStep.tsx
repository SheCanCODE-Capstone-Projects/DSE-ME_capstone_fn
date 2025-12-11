"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function FinishStep() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="text-center max-w-md mx-auto py-8 relative overflow-hidden">
     
      <div className="mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-6 bg-linear-to-r from-gray-500 to-sky-600 shadow-xl text-white text-6xl relative overflow-visible">
        ✓
        <div className="absolute -top-6 -right-6 text-white opacity-80">
          <Sparkles size={40} />
        </div>
        <div className="absolute -bottom-6 -left-6 text-white opacity-80">
          <Sparkles size={40} />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-sky-800 mb-3">
        All Set!
      </h2>

      <p className="text-gray-600 mb-6 text-lg">
        Your request has been successfully submitted.
      </p>

      <div className="p-6 bg-linear-to-r from-sky-50 to-white border-2 border-sky-300 rounded-2xl mb-8 shadow-lg text-sky-700 font-medium text-sm">
        Your request is now waiting for approval. You will receive an email once approved.
      </div>

      <button
        onClick={handleBackToLogin}
        className="px-8 py-4 rounded-full bg-linear-to-r from-sky-600 to-sky-700 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-200"
      >
        Back to Login
      </button>
    </div>
  );
}
