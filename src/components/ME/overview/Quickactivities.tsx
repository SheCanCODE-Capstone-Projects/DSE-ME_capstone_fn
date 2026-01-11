'use client'
import React from 'react';
import { UserPlus, ClipboardCheck, FileText, Send } from 'lucide-react';

const QuickActivities: React.FC = () => {
  const actions = [
    { label: 'Add Participant', icon: UserPlus, color: 'bg-sky-600 text-white' },
    { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-white text-slate-600 border border-slate-200' },
    { label: 'Export Reports', icon: FileText, color: 'bg-white text-slate-600 border border-slate-200' },
    { label: 'Notify Group', icon: Send, color: 'bg-white text-slate-600 border border-slate-200' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Activities</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-xs shadow-sm hover:shadow-md ${action.color}`}
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActivities;
