import { AlertTriangle, CheckSquare, Clock, XCircle, CheckCircle, AlertCircle } from "lucide-react";

export default function DataQualityTab() {
  return (
    <div className="space-y-6">
     
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#0B609D]" />
          Data Quality Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: CheckSquare, label: "Data Completeness", value: "96%", subtext: "All required fields" },
            { icon: Clock, label: "Pending Validation", value: "8", subtext: "Records awaiting review" },
            { icon: XCircle, label: "Data Errors", value: "2", subtext: "Requires correction" },
            { icon: CheckCircle, label: "Validated", value: "42", subtext: "Approved records" }
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

  
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Validation Queue</h2>
        <div className="space-y-3">
          {[
            { title: "Attendance Records - Week 3", submitter: "John Smith", time: "2 hours ago" },
            { title: "Grade Submissions - Module 2", submitter: "Jane Doe", time: "5 hours ago" }
          ].map((item, idx) => (
            <div key={idx} className="border border-orange-200 bg-orange-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">Submitted by {item.submitter} • {item.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Data Quality Issues</h2>
        <div className="space-y-2">
          <div className="border border-red-200 bg-red-50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-gray-900">Missing employment data for 3 participants</p>
            </div>
            <button className="text-sm text-[#0B609D] font-medium hover:underline">Fix Now</button>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-gray-900">Duplicate participant record detected</p>
            </div>
            <button className="text-sm text-[#0B609D] font-medium hover:underline">Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
