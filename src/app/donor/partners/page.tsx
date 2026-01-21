"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import AddPartnerModal from "@/components/PartnersComponents/AddPartnerModal";
import PartnersTable from "@/components/PartnersComponents/PartnersTable";
import PartnersStats from "@/components/PartnersComponents/PartnersStats";
import PartnersChart from "@/components/PartnersComponents/PartnersChart";

interface Partner {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  region: string;
  staff: string;
  status: string;
  joinDate: string;
  participants: number;
  programs: number;
}

const initialPartners: Partner[] = [
  {
    id: "1",
    name: "Klab Rwanda",
    type: "Organization",
    email: "info@klab.rw",
    phone: "+250-788-123-456",
    region: "Africa",
    staff: "45",
    status: "Active",
    joinDate: "2023-01-15",
    participants: 120,
    programs: 3
  },
  {
    id: "2",
    name: "Tech4Good Foundation",
    type: "NGO",
    email: "contact@tech4good.org",
    phone: "+250-788-654-321",
    region: "Africa",
    staff: "28",
    status: "Active",
    joinDate: "2023-03-20",
    participants: 85,
    programs: 2
  },
  {
    id: "3",
    name: "Digital Skills Initiative",
    type: "Government",
    email: "info@dsi.gov.rw",
    phone: "+250-788-987-654",
    region: "Africa",
    staff: "67",
    status: "Active",
    joinDate: "2023-02-10",
    participants: 200,
    programs: 4
  }
];

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddPartner = (newPartner: Partner) => {
    setPartners(prev => [...prev, newPartner]);
  };

  const handleViewPartner = (id: string) => {
    console.log("View partner:", id);
    // Navigate to partner details page
  };

  const handleEditPartner = (id: string) => {
    console.log("Edit partner:", id);
    // Open edit modal or navigate to edit page
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || partner.type === typeFilter;
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-sm text-gray-600">Manage your partner organizations</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7d] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {/* Stats Cards */}
      <PartnersStats partners={partners} />

      {/* Charts */}
      <PartnersChart partners={partners} />

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
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

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="Organization">Organization</option>
              <option value="NGO">NGO</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Status Filter */}
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

      {/* Partners Table */}
      <PartnersTable
        partners={filteredPartners}
        onView={handleViewPartner}
        onEdit={handleEditPartner}
      />

      {/* Add Partner Modal */}
      <AddPartnerModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreate={handleAddPartner}
      />
    </div>
  );
}