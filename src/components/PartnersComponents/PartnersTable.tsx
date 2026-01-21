import { Building2, Mail, Phone, MapPin, Users, TrendingUp, AlertTriangle, Heart } from "lucide-react";
import { type Partner } from "@/types/partners";

interface PartnersTableProps {
  partners: Partner[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function PartnersTable({ partners, onView, onEdit }: PartnersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Tech Hub':
        return 'bg-blue-100 text-blue-700';
      case 'NGO':
        return 'bg-purple-100 text-purple-700';
      case 'Educational Institution':
        return 'bg-green-100 text-green-700';
      case 'Training Center':
        return 'bg-orange-100 text-orange-700';
      case 'University':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (rate: number, type: 'employment' | 'dropout') => {
    if (type === 'employment') {
      if (rate >= 75) return 'text-green-600';
      if (rate >= 60) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (rate <= 5) return 'text-green-600';
      if (rate <= 10) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Partner Performance Overview</h2>
        <p className="text-sm text-gray-600">Monitor key performance indicators across implementation partners</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Partner</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Location</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Participants</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Employment Rate</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Dropout Rate</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Gender Distribution</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0B609D] to-blue-400 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{partner.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                          {partner.type}
                        </span>
                        <span className="text-xs text-gray-500">{partner.staff} staff</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="font-medium text-gray-900">{partner.province}</p>
                      <p className="text-xs text-gray-500">{partner.district}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{partner.totalParticipants.toLocaleString()}</span>
                      <span className="text-gray-500">total</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="text-green-600">{partner.activeParticipants} active</span> • 
                      <span className="text-blue-600">{partner.completedParticipants} completed</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${getPerformanceColor(partner.employmentRate, 'employment')}`} />
                    <span className={`font-semibold ${getPerformanceColor(partner.employmentRate, 'employment')}`}>
                      {partner.employmentRate}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Internship: {partner.internshipPlacementRate}%
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${getPerformanceColor(partner.dropoutRate, 'dropout')}`} />
                    <span className={`font-semibold ${getPerformanceColor(partner.dropoutRate, 'dropout')}`}>
                      {partner.dropoutRate}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="font-medium text-pink-600">{partner.femaleParticipants}</span>
                      <span className="text-gray-500">girls</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-600">{partner.maleParticipants}</span>
                      <span className="text-gray-500">boys</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {Math.round((partner.femaleParticipants / partner.totalParticipants) * 100) || 0}% female
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                    {partner.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(partner.id)}
                      className="text-[#0B609D] hover:text-[#094d7d] font-medium text-sm transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {partners.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No partners found</h3>
          <p className="text-gray-600">No partners match your current filters</p>
        </div>
      )}
    </div>
  );
}