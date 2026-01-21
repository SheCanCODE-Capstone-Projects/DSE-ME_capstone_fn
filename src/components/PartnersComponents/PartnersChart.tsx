interface Partner {
  id: string;
  name: string;
  type: string;
  status: string;
  participants: number;
  programs: number;
  region: string;
}

interface PartnersChartProps {
  partners: Partner[];
}

export default function PartnersChart({ partners }: PartnersChartProps) {
  // Group partners by type
  const partnersByType = partners.reduce((acc, partner) => {
    acc[partner.type] = (acc[partner.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group partners by region
  const partnersByRegion = partners.reduce((acc, partner) => {
    acc[partner.region] = (acc[partner.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeColors = {
    'Organization': '#0B609D',
    'NGO': '#8B5CF6',
    'Government': '#10B981',
    'Private': '#F59E0B'
  };

  const regionColors = {
    'Africa': '#EF4444',
    'Asia': '#3B82F6',
    'Europe': '#10B981',
    'North America': '#F59E0B',
    'South America': '#8B5CF6',
    'Oceania': '#EC4899'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Partners by Type Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Partners by Type</h3>
        <div className="space-y-4">
          {Object.entries(partnersByType).map(([type, count]) => {
            const percentage = partners.length > 0 ? (count / partners.length) * 100 : 0;
            return (
              <div key={type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: typeColors[type as keyof typeof typeColors] || '#6B7280'
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partners by Region Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Partners by Region</h3>
        <div className="space-y-4">
          {Object.entries(partnersByRegion).map(([region, count]) => {
            const percentage = partners.length > 0 ? (count / partners.length) * 100 : 0;
            return (
              <div key={region} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{region}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: regionColors[region as keyof typeof regionColors] || '#6B7280'
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}