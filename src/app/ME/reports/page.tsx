"use client";

import { useState } from "react";
import { FileText, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import MonitoringTab from "@/components/ME/ReportsComponents/MonitoringTab";
import EvaluationTab from "@/components/ME/ReportsComponents/EvaluationTab";
import DataQualityTab from "@/components/ME/ReportsComponents/DataQualityTab";
import GenerateReportsTab from "@/components/ME/ReportsComponents/GenerateReportsTab";

type TabType = 'monitoring' | 'evaluation' | 'data-quality' | 'reports';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('monitoring');
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
            <h1 className="text-2xl font-bold text-gray-900">M&E Reports</h1>
            <p className="text-sm text-gray-600">Monitoring, Evaluation, Data Quality & Reporting</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'monitoring' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Monitoring
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'evaluation' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Evaluation
          </button>
          <button
            onClick={() => setActiveTab('data-quality')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
              activeTab === 'data-quality' ? 'bg-[#0B609D] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Data Quality
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
      {activeTab === 'monitoring' && <MonitoringTab />}
      {activeTab === 'evaluation' && <EvaluationTab />}
      {activeTab === 'data-quality' && <DataQualityTab />}
      {activeTab === 'reports' && <GenerateReportsTab generating={generating} onGenerateReport={handleGenerateReport} />}
    </div>
  );
}
