"use client";
import { Keyboard, Target, Clock, Award, Calendar, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";
import StatCard from '@/components/ui/statuscard';
import { getAllParticipants } from '@/lib/mockParticipants';

const stats = [
  { title: "Average WPM", value: "45", subtext: "+3 this week", icon: <Keyboard size={32} /> },
  { title: "Average Accuracy", value: "92%", subtext: "+2% this week", icon: <Target size={32} /> },
  { title: "Total Sessions", value: "156", subtext: "+12 this week", icon: <Clock size={32} /> },
  { title: "Top Performer", value: "Sarah J.", subtext: "68 WPM", icon: <Award size={32} /> },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          subtext={stat.subtext}
        />
      ))}
    </div>
  )
}


const students = getAllParticipants().map((p, index) => ({
  rank: index + 1,
  name: p.name,
  email: p.email || `${p.name.toLowerCase().replace(' ', '.')}@example.com`,
  wpm: 0,
  accuracy: "0%",
  sessions: 0,
  duration: "0 min"
}));

function WeeklySummaryTable() {
  return (
    <div>
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


export default function DashboardContentPage() {
  const router = useRouter();
  
  return (
    <main className="flex-1 pt-4 pb-10 min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-sky-700">Typing Practice Summary</h2>
          <p className="text-sm text-gray-500">Weekly and overall typing practice statistics</p>
        </div>
      </div>

      <StatsCards />
      <WeeklySummaryTable />
    </main>
  )
}