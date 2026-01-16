import { Award, BookOpen, TrendingUp, CheckCircle, Briefcase } from "lucide-react";

export default function EvaluationTab() {
  return (
    <div className="space-y-6">
    
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#0B609D]" />
          Outcome & Impact Tracking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Award, label: "Employment Rate", value: "64%", subtext: "33 participants employed" },
            { icon: Briefcase, label: "Internships", value: "12", subtext: "Active placements" },
            { icon: TrendingUp, label: "Avg Income", value: "5.2M", subtext: "RWF per month" },
            { icon: CheckCircle, label: "Job Retention", value: "89%", subtext: "After 6 months" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
              <div className="text-[#1e3a8a] mb-2">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              <p className="text-2xl font-black text-gray-900">{item.value}</p>
              <p className="text-xs font-bold text-[#1e3a8a] mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#0B609D]" />
          Program Effectiveness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Completion Rate", value: "92%", subtext: "Target: 85%" },
            { label: "Skill Improvement", value: "+45%", subtext: "Pre vs Post assessment" },
            { label: "Gender Balance", value: "48/52", subtext: "Female participation" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              <p className="text-2xl font-black text-gray-900">{item.value}</p>
              <p className="text-xs font-bold text-[#1e3a8a] mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Comparison */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Cohort Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cohort</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Participants</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Completion</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">A-001</td>
                <td className="py-3 px-4">25</td>
                <td className="py-3 px-4">85%</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">100%</span></td>
                <td className="py-3 px-4">68%</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">A-002</td>
                <td className="py-3 px-4">27</td>
                <td className="py-3 px-4">89%</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">In Progress</span></td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
