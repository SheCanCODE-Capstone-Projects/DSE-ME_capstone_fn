"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, UserCheck } from "lucide-react";
import AddPartnerModal from "@/components/PartnersComponents/AddPartnerModal";
import PartnersTable from "@/components/PartnersComponents/PartnersTable";
import PartnersStats from "@/components/PartnersComponents/PartnersStats";
import PartnersChart from "@/components/PartnersComponents/PartnersChart";
import { type Partner } from "@/types/partners";
import { authApi } from "@/lib/authApi";
import toast from "react-hot-toast";
import AccessRequestsModal from "@/components/ME/Facilitator/AccessRequestsModal";
import { useGetPendingAccessRequests, useApproveAccessRequest, useRejectAccessRequest } from "@/hooks/auth/useAccessRequests";
import type { RoleRequestResponse } from "@/types/auth";

export default function PartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [accessRequestsOpen, setAccessRequestsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Map backend partners (organizations) to UI Partner type used in the donor dashboard
  const mapApiPartnersToUi = (apiPartners: import("@/types/auth").Partner[]): Partner[] => {
    return apiPartners.map((p) => ({
      id: p.partnerId,
      name: p.partnerName,
      type: "Tech Hub",
      email: p.contactEmail || "",
      phone: p.contactPhone || "",
      province: p.region || "Kigali City",
      district: "",
      staff: 0,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      totalParticipants: 0,
      activeParticipants: 0,
      completedParticipants: 0,
      dropoutRate: 0,
      employmentRate: 0,
      internshipPlacementRate: 0,
      programs: 0,
      participantsWithDisability: 0,
      femaleParticipants: 0,
      maleParticipants: 0,
    }));
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoadingPartners(true);
        const apiPartners = await authApi.getPartners();
        setPartners(mapApiPartnersToUi(apiPartners));
      } catch (error) {
        console.error("Failed to load partners", error);
        toast.error("Failed to load partners");
      } finally {
        setIsLoadingPartners(false);
      }
    };

    fetchPartners();
  }, []);

  const handleAddPartner = (newPartner: Partner & { branches?: Array<{ name: string; province: string; district: string; address?: string }> }): void => {
    (async () => {
      try {
        const created = await authApi.createPartner({
          name: newPartner.name,
          email: newPartner.email,
          phone: newPartner.phone,
          province: newPartner.province,
        });

        // Create main center from primary location if district is provided
        if (newPartner.district) {
          await authApi.createCenter(created.partnerId, {
            centerName: `${newPartner.name} Main`,
            location: `${newPartner.province} - ${newPartner.district}`,
            country: created.country,
            region: created.region,
          });
        }

        // Create centers for each branch
        const branches = newPartner.branches || [];
        for (const branch of branches) {
          if (branch.name?.trim() && branch.district?.trim()) {
            await authApi.createCenter(created.partnerId, {
              centerName: branch.name.trim(),
              location: `${branch.province || "Kigali City"} - ${branch.district.trim()}`,
              country: created.country,
              region: created.region,
            });
          }
        }

        const apiPartners = await authApi.getPartners();
        setPartners(mapApiPartnersToUi(apiPartners));
        toast.success("Partner created successfully");
      } catch (error) {
        console.error("Failed to create partner", error);
        toast.error("Failed to create partner");
      }
    })();
  };

  const handleViewPartner = (id: string): void => {
    router.push(`/donor/partners/${id}`);
  };

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || partner.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    const matchesProvince = provinceFilter === 'all' || partner.province === provinceFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesProvince;
  });

  return (
    <div className="space-y-6">
      {/* Access Requests Button */}
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Implementation Partners</h1>
          <p className="text-sm text-gray-600">Monitor partner performance across Rwanda • {partners.length} active partners</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7d] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

     
      <PartnersStats partners={partners} />

     
      <PartnersChart partners={partners} />

    
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="Tech Hub">Tech Hub</option>
              <option value="NGO">NGO</option>
              <option value="Educational Institution">Educational Institution</option>
              <option value="Training Center">Training Center</option>
              <option value="University">University</option>
            </select>
          </div>

          <div>
            <select
              value={provinceFilter}
              onChange={(e) => setProvinceFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Provinces</option>
              <option value="Kigali City">Kigali City</option>
              <option value="Northern Province">Northern Province</option>
              <option value="Southern Province">Southern Province</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="Western Province">Western Province</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

     
      <PartnersTable
        partners={filteredPartners}
        onView={handleViewPartner}
      />

     
      <AddPartnerModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreate={handleAddPartner}
      />

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
}