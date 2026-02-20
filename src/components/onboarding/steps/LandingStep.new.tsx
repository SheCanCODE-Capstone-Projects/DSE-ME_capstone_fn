"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 h-1 bg-sky-600 rounded-full"></div>
          <span className="text-sm font-semibold text-sky-600 ml-4">Step 1 of 4</span>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-400 to-sky-600 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <Sparkles size={32} />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Access</h1>

      <p className="text-gray-600 mb-8 text-lg">
        Complete this quick 4-step process to request access to DSE&apos;s platform and join as a team member.
      </p>

      {/* What to expect */}
      <div className="bg-sky-50 rounded-2xl p-6 mb-8 border border-sky-200">
        <h3 className="font-semibold text-gray-900 mb-4 text-left">What happens next:</h3>
        <div className="space-y-3 text-left">
          <div className="flex gap-3">
            <CheckCircle2 className="text-sky-600 flex-shrink-0" size={20} />
            <span className="text-gray-700">Select your desired role</span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="text-sky-600 flex-shrink-0" size={20} />
            <span className="text-gray-700">Tell us about yourself and why you need access</span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="text-sky-600 flex-shrink-0" size={20} />
            <span className="text-gray-700">Submit your request for admin review</span>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="text-sky-600 flex-shrink-0" size={20} />
            <span className="text-gray-700">Receive email notification once approved</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gray-600 to-sky-700 text-white font-semibold transition-all hover:shadow-lg hover:scale-105"
      >
        Start Setup
        <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}
