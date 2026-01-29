"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FileText, Activity, DollarSign, PieChart } from 'lucide-react';
import PerformanceTab from '../../../components/donorComponents/report components/PerfomanceTab';
import FinancialAuditsTab from '../../../components/donorComponents/report components/FinancilaAuditTab';
import GenderBalanceTab from '../../../components/donorComponents/report components/GenderBalanceTab';
import GenerateReportsTab from '../../../components/donorComponents/report components/GenerateReportsTab';


type TabType = 'Perfomance' | 'FinancialAudits' | 'GenderBalance' | 'reports';
const partnerData = [
  { 
    id: "p1", 
    name: "Klab Rwanda", 
    performance: { reach: 95, employment: 78, graduation: 92 },
    finance: { budget: "$120k", spent: "$98k", status: "Verified", auditDate: "Jan 12, 2025" },
    gender: { female: 62, male: 38 }
  },
  { 
    id: "p2", 
    name: "Rwanda Coding Academy", 
    performance: { reach: 88, employment: 82, graduation: 95 },
    finance: { budget: "$200k", spent: "$145k", status: "Verified", auditDate: "Jan 15, 2025" },
    gender: { female: 45, male: 55 }
  },
  { 
    id: "p3", 
    name: "Digital Opportunity Trust", 
    performance: { reach: 72, employment: 65, graduation: 80 },
    finance: { budget: "$85k", spent: "$82k", status: "Pending", auditDate: "Feb 02, 2025" },
    gender: { female: 70, male: 30 }
  },
  { 
    id: "p4", 
    name: "WeCode Rwanda", 
    performance: { reach: 98, employment: 70, graduation: 88 },
    finance: { budget: "$150k", spent: "$110k", status: "Flagged", auditDate: "Jan 28, 2025" },
    gender: { female: 100, male: 0 }
  }
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('Perfomance');
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerateReport = async (reportId: string, reportTitle: string) => {
    setGenerating(reportId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success(`${reportTitle} generated successfully!`);
    setGenerating(null);
    
    const blob = new Blob([`Report: ${reportTitle}\nGenerated: ${new Date().toLocaleString()}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#0B609D] rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Donor Reports</h1>
            <p className="text-sm text-gray-600">Perfomance, FinancialAudits, GenderBalance & Reporting</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('Perfomance')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'Perfomance' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Perfomance
          </button>
          <button
            onClick={() => setActiveTab('FinancialAudits')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'FinancialAudits' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            FinancialAudits
          </button>
          <button
            onClick={() => setActiveTab('GenderBalance')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'GenderBalance' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PieChart className="w-4 h-4 inline mr-2" />
            GenderBalacnce
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'reports' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Perfomance' && <PerformanceTab partnerData={partnerData} />}
      {activeTab === 'FinancialAudits' && <FinancialAuditsTab partnerData={partnerData} />}
      {activeTab === 'GenderBalance' && <GenderBalanceTab partnerData={partnerData} />}
      {activeTab === 'reports' && <GenerateReportsTab generating={generating} onGenerateReport={handleGenerateReport} />}
    </div>
  );
}
