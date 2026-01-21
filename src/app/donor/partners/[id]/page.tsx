"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, MapPin, Users, TrendingUp, AlertTriangle, Heart, CheckCircle, X } from "lucide-react";
import { useState, use } from "react";
import { getPartnerById, getMERequestsByPartnerId } from "@/data/partnersData";
import { type Partner, type MERequest } from "@/types/partners";

export default function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const partner = getPartnerById(id);
  const [meRequests, setMeRequests] = useState<MERequest[]>(
    getMERequestsByPartnerId(id)
  );

  const handleMERequest = (requestId: string, action: 'approved' | 'denied'): void => {
    setMeRequests((prev) => prev.map((req) => 
      req.id === requestId ? { ...req, status: action } : req
    ));
  };

  if (!partner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner not found</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7d] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (rate: number, type: 'employment' | 'dropout'): string => {
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Partners
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{partner.name}</h1>
            <p className="text-gray-600">{partner.type} • {partner.province}, {partner.district}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
          {partner.status}
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0B609D]/10 rounded-xl">
              <Users className="w-6 h-6 text-[#0B609D]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Participants</h3>
              <p className="text-2xl font-bold text-gray-900">{partner.totalParticipants.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{partner.activeParticipants} currently active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className={`w-6 h-6 ${getPerformanceColor(partner.employmentRate, 'employment')}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Employment Rate</h3>
              <p className={`text-2xl font-bold ${getPerformanceColor(partner.employmentRate, 'employment')}`}>
                {partner.employmentRate}%
              </p>
              <p className="text-xs text-gray-500">Internship: {partner.internshipPlacementRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-xl">
              <AlertTriangle className={`w-6 h-6 ${getPerformanceColor(partner.dropoutRate, 'dropout')}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Dropout Rate</h3>
              <p className={`text-2xl font-bold ${getPerformanceColor(partner.dropoutRate, 'dropout')}`}>
                {partner.dropoutRate}%
              </p>
              <p className="text-xs text-gray-500">Program average</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Inclusion</h3>
              <p className="text-2xl font-bold text-purple-600">{partner.participantsWithDisability}</p>
              <p className="text-xs text-gray-500">with disabilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & Organization Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Contact Email</label>
              <p className="text-gray-900">{partner.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <p className="text-gray-900">{partner.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Location</label>
              <p className="text-gray-900">{partner.province}, {partner.district}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Staff Count</label>
              <p className="text-gray-900">{partner.staff} employees</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Programs</label>
              <p className="text-gray-900">{partner.programs} active programs</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Partnership Since</label>
              <p className="text-gray-900">{new Date(partner.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gender Distribution</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Female Participants</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-pink-600">{partner.femaleParticipants}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((partner.femaleParticipants / partner.totalParticipants) * 100)}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Male Participants</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{partner.maleParticipants}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((partner.maleParticipants / partner.totalParticipants) * 100)}%
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-pink-500 h-3 rounded-l-full" 
                  style={{ width: `${(partner.femaleParticipants / partner.totalParticipants) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ME Requests Section */}
      {meRequests.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">ME Access Requests</h2>
          <div className="space-y-4">
            {meRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{request.name}</h3>
                    <p className="text-sm text-gray-600">{request.email} • {request.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">{request.experience}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Requested on {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleMERequest(request.id, 'approved')}
                          className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7d] transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleMERequest(request.id, 'denied')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Deny
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {request.status === 'approved' ? 'Approved' : 'Denied'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}