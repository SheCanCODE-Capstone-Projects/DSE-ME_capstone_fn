"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ProgressProps = {
  steps: string[];
  active: number;
};

export default function TopProgress({ steps, active }: ProgressProps) {
  const pct = Math.min(
    100,
    Math.max(0, (active / Math.max(1, steps.length - 1)) * 100)
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-6">
     
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-lg font-bold text-gray-900">Account Setup</div>
          <div className="text-sm text-gray-500 mt-0.5">Complete your profile</div>
        </div>

        <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full">
          <span className="text-sm font-semibold text-sky-700">{active + 1}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-600">{steps.length}</span>
        </div>
      </div>


      <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-8 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="h-3 rounded-full bg-linear-to-r from-sky-500 to-sky-600 shadow-sm"
        />
      </div>

     
      <div className="relative">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isActive = index === active;
            const isDone = index < active;

            return (
              <motion.div
                key={step}
                className="flex flex-col items-center relative w-12"
                layout
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
               
                <motion.div
                  layoutId={isActive ? "active-step" : undefined}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mb-1
                    ${isDone
                      ? "bg-sky-600 text-white"
                      : isActive
                      ? "bg-white border-2 border-sky-600 text-sky-600"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                >
                  {isDone ? "✓" : index + 1}
                </motion.div>

                
                <div
                  className={`text-xs text-center ${isActive ? "text-gray-900 font-semibold" : "text-gray-500"}`}
                >
                  {step}
                </div>

                
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -15 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-8 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-md z-50 pointer-events-none"
                  >
                    {step}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
