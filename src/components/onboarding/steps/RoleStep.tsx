"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function RoleStep({ onNext }: { onNext: (role: string) => void }) {
  const [selected, setSelected] = useState("");

  const roles = [
    { id: "ME", label: "ME Officer" },
    { id: "Facilitator", label: "Facilitator" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Select your role</h2>

      <div className="space-y-3 mb-8">
        {roles.map((r, i) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selected === r.id
                ? "border-sky-600 bg-sky-50 text-sky-700"
                : "border-gray-200 text-gray-500"
            }`}
            onClick={() => setSelected(r.id)}
          >
            {r.label}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
          className={`px-8 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${
            selected
              ? "bg-gradient-to-r from-gray-600 to-sky-700 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
