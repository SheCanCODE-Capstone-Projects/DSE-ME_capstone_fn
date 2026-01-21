import { Building2, Users, TrendingUp, AlertTriangle, CheckCircle, Heart } from "lucide-react";
import { type Partner } from "@/types/partners";

interface PartnersStatsProps {
  partners: Partner[];
}

export default function PartnersStats({ partners }: PartnersStatsProps) {
  const activePartners = partners.filter(p => p.status === 'Active');
  const totalParticipants = partners.reduce((sum, p) => sum + p.totalParticipants, 0);
  const totalActive = partners.reduce((sum, p) => sum + p.activeParticipants, 0);
  const totalCompleted = partners.reduce((sum, p) => sum + p.completedParticipants, 0);
  const avgEmploymentRate = activePartners.length > 0 
    ? activePartners.reduce((sum, p) => sum + p.employmentRate, 0) / activePartners.length 
    : 0;
  const avgDropoutRate = activePartners.length > 0 
    ? activePartners.reduce((sum, p) => sum + p.dropoutRate, 0) / activePartners.length 
    : 0;
  const totalDisabilityParticipants = partners.reduce((sum, p) => sum + p.participantsWithDisability, 0);

  const stats = [
    {
      icon: Building2,
      title: "Active Partners",
      value: activePartners.length.toString(),
      subtext: `${partners.length} total`,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Users,
      title: "Total Participants",
      value: totalParticipants.toLocaleString(),
      subtext: `${totalActive} currently active`,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: CheckCircle,
      title: "Employment Rate",
      value: `${Math.round(avgEmploymentRate)}%`,
      subtext: "Average across partners",
      color: avgEmploymentRate >= 75 ? "text-green-600" : avgEmploymentRate >= 60 ? "text-yellow-600" : "text-red-600",
      bgColor: avgEmploymentRate >= 75 ? "bg-green-50" : avgEmploymentRate >= 60 ? "bg-yellow-50" : "bg-red-50"
    },
    {
      icon: AlertTriangle,
      title: "Dropout Rate",
      value: `${Math.round(avgDropoutRate * 10) / 10}%`,
      subtext: "Program average",
      color: avgDropoutRate <= 5 ? "text-green-600" : avgDropoutRate <= 10 ? "text-yellow-600" : "text-red-600",
      bgColor: avgDropoutRate <= 5 ? "bg-green-50" : avgDropoutRate <= 10 ? "bg-yellow-50" : "bg-red-50"
    },
    {
      icon: TrendingUp,
      title: "Completion Rate",
      value: `${Math.round((totalCompleted / totalParticipants) * 100)}%`,
      subtext: `${totalCompleted.toLocaleString()} completed`,
      color: "text-[#0B609D]",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "Disability Inclusion",
      value: totalDisabilityParticipants.toString(),
      subtext: `${Math.round((totalDisabilityParticipants / totalParticipants) * 100)}% of participants`,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-3xl p-4 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className={`${stat.color} p-2 rounded-xl bg-white/50`}>
              <stat.icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-700">{stat.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <span className="text-xs text-gray-600">{stat.subtext}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}