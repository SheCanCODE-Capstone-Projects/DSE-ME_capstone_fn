import { Activity, Calendar, TrendingUp, Users, CheckCircle, AlertCircle, Award, XCircle } from "lucide-react";

export default function MonitoringTab() {
  return (
    <div className="space-y-6">
      {/* Program Monitoring Dashboard */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0B609D]" />
          Program Monitoring Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Enrolled", value: "52", subtext: "Current & Past Cohorts" },
            { icon: CheckCircle, label: "Active", value: "50", subtext: "96% Retention Rate" },
            { icon: Award, label: "Completed", value: "2", subtext: "From Previous Cohorts" },
            { icon: XCircle, label: "Dropped Out", value: "0", subtext: "0% Dropout Rate" }
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

      {/* Attendance & Participation */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#0B609D]" />
          Attendance & Participation Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle, label: "Average Attendance", value: "94%", subtext: "Weekly average" },
            { icon: AlertCircle, label: "Low Attendance Alerts", value: "3", subtext: "Requires intervention" },
            { icon: Users, label: "Present Today", value: "48/52", subtext: "92% present" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <item.icon className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              <p className="text-2xl font-black text-gray-900">{item.value}</p>
              <p className="text-xs font-bold text-[#1e3a8a] mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Monitoring */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0B609D]" />
          Performance Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Average Score", value: "87%", subtext: "↑ 3% from last month" },
            { label: "Pass Rate", value: "92%", subtext: "48/52 participants" },
            { label: "Top Performers", value: "12", subtext: "Score ≥ 90%" },
            { label: "Need Support", value: "5", subtext: "Score < 70%" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              <p className="text-2xl font-black text-gray-900">{item.value}</p>
              <p className="text-xs font-bold text-[#1e3a8a] mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
