import { Building2, Users, TrendingUp, Globe } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: string;
  status: string;
  participants: number;
  programs: number;
  region: string;
}

interface PartnersStatsProps {
  partners: Partner[];
}

export default function PartnersStats({ partners }: PartnersStatsProps) {
  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.status === 'Active').length;
  const totalParticipants = partners.reduce((sum, p) => sum + p.participants, 0);
  const totalPrograms = partners.reduce((sum, p) => sum + p.programs, 0);

  const stats = [
    {
      icon: Building2,
      title: "Total Partners",
      value: totalPartners.toString(),
      subtext: `${activePartners} active`,
      color: "text-[#1e3a8a]"
    },
    {
      icon: Users,
      title: "Total Participants",
      value: totalParticipants.toString(),
      subtext: "Across all partners",
      color: "text-[#1e3a8a]"
    },
    {
      icon: TrendingUp,
      title: "Active Programs",
      value: totalPrograms.toString(),
      subtext: "Running programs",
      color: "text-[#1e3a8a]"
    },
    {
      icon: Globe,
      title: "Regions Covered",
      value: new Set(partners.map(p => p.region)).size.toString(),
      subtext: "Global reach",
      color: "text-[#1e3a8a]"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300"
        >
          <div className={stat.color}>
            <stat.icon size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{stat.title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{stat.value}</span>
              <span className="text-xs font-bold text-[#1e3a8a]">{stat.subtext}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}