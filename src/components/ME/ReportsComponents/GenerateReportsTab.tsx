import { TrendingUp, Calendar, Award, Users, BookOpen, CheckCircle, Download } from "lucide-react";

interface GenerateReportsTabProps {
  generating: string | null;
  onGenerateReport: (reportId: string, reportTitle: string) => void;
}

export default function GenerateReportsTab({ generating, onGenerateReport }: GenerateReportsTabProps) {
  const reports = [
    { id: 'monthly-performance', title: 'Monthly Performance Report', desc: 'Comprehensive monthly program performance', icon: TrendingUp },
    { id: 'attendance-summary', title: 'Attendance Summary', desc: 'Weekly and monthly attendance data', icon: Calendar },
    { id: 'employment-outcomes', title: 'Employment Outcomes', desc: 'Job placements and income tracking', icon: Award },
    { id: 'cohort-comparison', title: 'Cohort Comparison', desc: 'Performance across different cohorts', icon: Users },
    { id: 'facilitator-performance', title: 'Facilitator Performance', desc: 'Facilitator effectiveness metrics', icon: BookOpen },
    { id: 'data-quality', title: 'Data Quality Report', desc: 'Data completeness and validation status', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
  
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Standard Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => {
            const Icon = report.icon;
            const isGenerating = generating === report.id;
            
            return (
              <div key={report.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0B609D] to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => onGenerateReport(report.id, report.title)}
                  disabled={isGenerating}
                  className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    isGenerating
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#0B609D] text-white hover:bg-[#094d7d]'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
