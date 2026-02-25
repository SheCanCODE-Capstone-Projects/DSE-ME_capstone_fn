
"use client";

import React, { useState } from 'react';
import StatusCard from '../../../components/ui/statuscard';
import ImpactTrendChart from '../../../components/donorComponents/graphs/ImpactTrendChart';
import { Handshake, Users, Briefcase, TrendingUp, Target, UserCheck } from 'lucide-react';
import QuickActivities from '../../../components/donorComponents/overview/Quickactivities';
import AccessRequestsModal from '@/components/ME/Facilitator/AccessRequestsModal';
import { useGetPendingAccessRequests, useApproveAccessRequest, useRejectAccessRequest } from '@/hooks/auth/useAccessRequests';
import type { RoleRequestResponse } from '@/types/auth';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { getPersonalizedGreeting } from '@/lib/userUtils';
import { useDonorStatistics } from '@/hooks/donor/useDonorStatistics';

const Dashboard: React.FC = () => {
  const { data: statistics, isLoading } = useDonorStatistics();
  
  const stats = [
    { title: "Total Partners", value: statistics?.totalPartners ?? 0, icon: <Handshake size={28}/>, subtext: "Active" },
    { title: "Total Impacted", value: statistics?.totalImpacted?.toLocaleString() ?? "0", icon: <Users size={28}/>, subtext: "Individuals" },
    { title: "Avg. Employment", value: `${statistics?.avgEmploymentRate ?? 0}%`, icon: <Briefcase size={28}/>, subtext: "Rate" },
    { title: "Efficiency", value: `${statistics?.budgetEfficiency ?? 0}%`, icon: <TrendingUp size={28}/>, subtext: "Budget" },
  ];

  const topPartners = [
    { name: "Rwanda Coding Academy", rate: 82, color: "bg-green-500" },
    { name: "Klab Rwanda", rate: 78, color: "bg-[#0B609D]" },
    { name: "WeCode Rwanda", rate: 70, color: "bg-orange-500" },
  ];

  const [accessRequestsOpen, setAccessRequestsOpen] = useState(false);
  const { user } = useAuth();

  const { data: accessRequestsData, refetch } = useGetPendingAccessRequests() as {
    data?: { content: RoleRequestResponse[] };
    refetch: () => void;
  };
  const approveRequest = useApproveAccessRequest();
  const rejectRequest = useRejectAccessRequest();
  const accessRequests: RoleRequestResponse[] = accessRequestsData?.content || [];

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveRequest.mutateAsync(requestId);
      refetch();
      toast.success('Access request approved successfully!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectRequest.mutateAsync(requestId);
      refetch();
      toast.success('Access request rejected successfully!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to reject request');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {getPersonalizedGreeting(user)}
        </h1>
        <p className="text-gray-600 mt-1">Monitor your partners and track program impact.</p>
      </div>

      {/* Access Requests Button - Above stat cards */}
      <div className="flex justify-end">
        <button
          onClick={() => setAccessRequestsOpen(true)}
          className="relative flex items-center gap-2 px-4 py-3 bg-[#0B609D] text-white rounded-2xl hover:bg-[#094d7a] transition shadow-sm"
        >
          <UserCheck size={18} />
          <span className="font-medium text-sm">Access Requests</span>
          {accessRequests.length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {accessRequests.length}
            </span>
          )}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatusCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImpactTrendChart />
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="text-[#0B609D]" size={22}/> Top Performing Partners
          </h3>
          <div className="space-y-4">
            {topPartners.map((p, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-bold text-slate-800">{p.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Employment Success</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-[#1e3a8a]">{p.rate}%</p>
                  <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                    <div style={{ width: `${p.rate}%` }} className={`h-full rounded-full ${p.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuickActivities />

      <AccessRequestsModal
        isOpen={accessRequestsOpen}
        onClose={() => setAccessRequestsOpen(false)}
        requests={accessRequests}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        loading={approveRequest.isPending || rejectRequest.isPending}
      />
    </div>
  );
};

export default Dashboard;
