import React from 'react';
import { AlertCircle, Activity } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-80">
      <h3 className="text-sm font-bold text-gray-800 mb-6">Alerts & Reminders</h3>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-red-600 bg-red-50 p-2 rounded-full shrink-0">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm font-medium text-gray-600 leading-snug">
            <span className="font-bold text-gray-800">5 participants</span> missing attendance today
          </p>
        </div>

        <div className="flex items-start gap-3">
           <div className="text-[#1e3a8a] bg-blue-50 p-2 rounded-full shrink-0">
            <Activity size={20} />
          </div>
          <div className="text-sm font-medium text-gray-600 leading-snug">
             <p>Survey response rate</p>
             <p>is low: <span className="font-bold text-gray-800">42/52</span></p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="text-red-600 bg-red-50 p-2 rounded-full shrink-0">
            <AlertCircle size={20} />
          </div>
           <div className="text-sm font-medium text-gray-600 leading-snug">
             <p>Final project submission</p>
             <p>deadline approaching: <span className="font-bold text-gray-800">2 days</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;