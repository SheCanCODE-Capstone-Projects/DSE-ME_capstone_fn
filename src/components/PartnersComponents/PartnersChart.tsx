import { type Partner } from "@/types/partners";

interface PartnersChartProps {
  partners: Partner[];
}

export default function PartnersChart({ partners }: PartnersChartProps) {
  const activePartners = partners.filter(p => p.status === 'Active');
  

  const partnersByProvince = partners.reduce((acc, partner) => {
    acc[partner.province] = (acc[partner.province] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const participantsByProvince = partners.reduce((acc, partner) => {
    acc[partner.province] = (acc[partner.province] || 0) + partner.totalParticipants;
    return acc;
  }, {} as Record<string, number>);

 
  const topPerformers = activePartners
    .sort((a, b) => b.employmentRate - a.employmentRate)
    .slice(0, 5);

  const provinceColors = {
    'Kigali City': '#0B609D',
    'Northern Province': '#10B981',
    'Southern Province': '#F59E0B',
    'Eastern Province': '#8B5CF6',
    'Western Province': '#EF4444'
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 75) return '#10B981'; // Green
    if (rate >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Geographic Distribution</h3>
        <div className="space-y-4">
          {Object.entries(partnersByProvince).map(([province, count]) => {
            const participants = participantsByProvince[province] || 0;
            const percentage = partners.length > 0 ? (count / partners.length) * 100 : 0;
            return (
              <div key={province} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{province}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{count} partners</div>
                    <div className="text-xs text-gray-500">{participants.toLocaleString()} participants</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: provinceColors[province as keyof typeof provinceColors] || '#6B7280'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

   
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Employment Performance</h3>
        <div className="space-y-4">
          {topPerformers.map((partner) => {
            return (
              <div key={partner.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                    <div className="text-xs text-gray-500">{partner.totalParticipants} participants</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: getPerformanceColor(partner.employmentRate) }}>
                      {partner.employmentRate}%
                    </div>
                    <div className="text-xs text-gray-500">employment</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${partner.employmentRate}%`,
                      backgroundColor: getPerformanceColor(partner.employmentRate)
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

  
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Indicators</h3>
        <div className="space-y-4">
         
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 mb-2">High Dropout Risk</h4>
            {activePartners
              .filter(p => p.dropoutRate > 10)
              .slice(0, 3)
              .map(partner => (
                <div key={partner.id} className="flex justify-between items-center py-1">
                  <span className="text-xs text-red-700">{partner.name}</span>
                  <span className="text-xs font-bold text-red-800">{partner.dropoutRate}%</span>
                </div>
              ))
            }
            {activePartners.filter(p => p.dropoutRate > 10).length === 0 && (
              <p className="text-xs text-red-600">No high-risk partners</p>
            )}
          </div>

         
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">Low Employment Rate</h4>
            {activePartners
              .filter(p => p.employmentRate < 60)
              .slice(0, 3)
              .map(partner => (
                <div key={partner.id} className="flex justify-between items-center py-1">
                  <span className="text-xs text-yellow-700">{partner.name}</span>
                  <span className="text-xs font-bold text-yellow-800">{partner.employmentRate}%</span>
                </div>
              ))
            }
            {activePartners.filter(p => p.employmentRate < 60).length === 0 && (
              <p className="text-xs text-yellow-600">All partners performing well</p>
            )}
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <h4 className="text-sm font-semibold text-purple-800 mb-2">Disability Inclusion</h4>
            {partners
              .filter(p => p.participantsWithDisability > 0)
              .sort((a, b) => b.participantsWithDisability - a.participantsWithDisability)
              .slice(0, 3)
              .map(partner => (
                <div key={partner.id} className="flex justify-between items-center py-1">
                  <span className="text-xs text-purple-700">{partner.name}</span>
                  <span className="text-xs font-bold text-purple-800">{partner.participantsWithDisability} participants</span>
                </div>
              ))
            }
            {partners.filter(p => p.participantsWithDisability > 0).length === 0 && (
              <p className="text-xs text-purple-600">No disability data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}