import { Keyboard, Target, Clock, TrendingUp, Award, Calendar } from "lucide-react"

// StatsCards data
const stats = [
  { label: "Avg WPM", value: "0", icon: Keyboard, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Avg Accuracy", value: "0%", icon: Target, color: "text-sky-600", bgColor: "bg-sky-50" },
  { label: "Total Sessions", value: "0", icon: Clock, color: "text-indigo-600", bgColor: "bg-indigo-50" },
  { label: "Total Hours", value: "0h", icon: TrendingUp, color: "text-cyan-600", bgColor: "bg-cyan-50" },
  { label: "Top WPM", value: "0", icon: Award, color: "text-blue-600", bgColor: "bg-blue-50" },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-5 gap-4 px-8 mb-8 ">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-[20px] border border-slate-100 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <div className={`${stat.bgColor} p-3 rounded-xl`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#0057B8] leading-none">{stat.value}</span>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// WeeklySummaryTable data
const students = [
  { rank: 1, name: "John Smith", email: "john.smith@example.com", wpm: 0, accuracy: "0%", sessions: 0, duration: "0 min" },
  { rank: 2, name: "Sarah Johnson", email: "sarah.j@example.com", wpm: 0, accuracy: "0%", sessions: 0, duration: "0 min" },
  { rank: 3, name: "Michael Brown", email: "m.brown@example.com", wpm: 0, accuracy: "0%", sessions: 0, duration: "0 min" },
  { rank: 4, name: "Emily Davis", email: "emily.d@example.com", wpm: 0, accuracy: "0%", sessions: 0, duration: "0 min" },
  { rank: 5, name: "David Wilson", email: "d.wilson@example.com", wpm: 0, accuracy: "0%", sessions: 0, duration: "0 min" },
]

function WeeklySummaryTable() {
  return (
    <div className="px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#34597E]">Weekly Summary</h2>
        <button className="flex items-center gap-3 px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
          <span>Week --, ----</span>
          <Calendar className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#EEF4FB] text-[#0057B8] text-[13px] font-bold">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4 text-center">Avg WPM</th>
              <th className="px-6 py-4 text-center">Avg Accuracy</th>
              <th className="px-6 py-4 text-center">Sessions</th>
              <th className="px-6 py-4 text-center">Total Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.rank} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      student.rank === 1
                        ? "bg-[#FFD700] text-white"
                        : student.rank === 2
                        ? "bg-[#C0C0C0] text-white"
                        : student.rank === 3
                        ? "bg-[#CD7F32] text-white"
                        : "text-[#0057B8]"
                    }`}
                  >
                    {student.rank}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div>
                    <p className="font-bold text-slate-800 text-[15px]">{student.name}</p>
                    <p className="text-[12px] text-slate-400 font-medium">{student.email}</p>
                  </div>
                </td>
                <td className="px-6 py-6 text-center font-bold text-[#0057B8] text-[15px]">{student.wpm}</td>
                <td className="px-6 py-6 text-center font-bold text-slate-800 text-[15px]">{student.accuracy}</td>
                <td className="px-6 py-6 text-center font-bold text-slate-800 text-[15px]">{student.sessions}</td>
                <td className="px-6 py-6 text-center font-bold text-slate-800 text-[15px]">{student.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// page.tsx content
export default function DashboardContentPage() {
  return (
    <main className="flex-1 pt-4 pb-10 bg-[#f0f4f8] min-h-screen ml-20">
      <div className="px-8 mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Typing Practice Summary</h2>
        <p className="text-slate-500 mb-6">Weekly and overall typing practice statistics</p>
      </div>

      <StatsCards />
      <WeeklySummaryTable />
    </main>
  )
}