"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LandingStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-400 to-sky-600 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <Sparkles size={32} />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Required</h1>

      <p className="text-gray-600 mb-8 text-lg">
        It looks like your account doesn’t yet have access.
      </p>

      <button
        onClick={onNext}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gray-600 to-sky-700 text-white font-semibold transition-all"
      >
        Start Setup
        <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}
