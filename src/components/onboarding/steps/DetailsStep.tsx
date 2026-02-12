"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, MapPin, Building2, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import type { ProfileDetails, UserRole, Organization } from "@/types/profile";
import { organizations as orgData } from "@/lib/onboardingData";
import toast from "react-hot-toast";

interface DetailsStepProps {
  role: string;
  onNext: (reason: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function DetailsStep({ role, onNext, onBack, isLoading = false }: DetailsStepProps) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [focusedField, setFocusedField] = useState<string>("");

  const isValid = reason.trim().length >= 10;

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;
    onNext(reason);
  };

  return (
  
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 mb-8">
          Role: <span className="text-sky-600 font-semibold">{role}</span>
        </p>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onFocus={() => setFocusedField("reason")}
              onBlur={() => setFocusedField("")}
              placeholder="Why do you need this role? Please provide details about your background and how you plan to use this access..."
              className={`w-full pl-12 pr-4 py-4 h-32 rounded-2xl border-2 text-gray-500 bg-white outline-none ${
                focusedField === "reason" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            />
            {reason.trim().length > 0 && reason.trim().length < 10 && (
              <p className="text-xs text-red-500 mt-1">Please provide at least 10 characters</p>
            )}
          </div>
        </div>

       
        <div className="flex justify-between gap-3">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <button
            disabled={!isValid || isLoading}
            onClick={handleSubmit}
            className={`px-8 py-4 rounded-full flex items-center gap-2 font-semibold transition-all ${
              isValid && !isLoading
                ? "bg-gradient-to-r from-gray-600 to-sky-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
   
  );
}