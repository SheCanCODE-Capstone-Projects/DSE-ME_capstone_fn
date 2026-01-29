
"use client";

import React from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

interface GenerateReportsTabProps {
  generating: string | null;
  onGenerate: (id: string, name: string) => void;
}

const GenerateReportsTab: React.FC<GenerateReportsTabProps> = ({ generating, onGenerate }) => {
  const reports = [
    { id: "partner-perf-v1", name: "Consolidated Partner Performance Matrix", type: "Performance", date: "Feb 2025" },
    { id: "audit-summary-2025", name: "Annual Financial Audit Summary", type: "Finance", date: "Jan 2025" },
    { id: "gender-equity-map", name: "Gender Equity Distribution Report", type: "Inclusion", date: "Jan 2025" },
    { id: "full-monitoring-pkg", name: "Comprehensive M&E Full Package", type: "Full Audit", date: "Feb 2025" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {reports.map((report) => (
        <div key={report.id} className="group p-8 rounded-[32px] bg-white border border-slate-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-[#0B609D] group-hover:text-white transition-colors">
              <FileText size={28} />
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.type}</span>
              <span className="block text-xs font-bold text-[#0B609D]">{report.date}</span>
            </div>
          </div>
          <h4 className="text-lg font-black text-[#1e3a8a] leading-tight mb-6">{report.name}</h4>
          <button 
            onClick={() => onGenerate(report.id, report.name)}
            disabled={generating !== null}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0B609D] hover:bg-[#0B609D] hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating === report.id ? (
              <><Loader2 size={16} className="animate-spin" /> Gathering Partner Data...</>
            ) : (
              <><Download size={16} /> Download CSV/PDF</>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GenerateReportsTab;
