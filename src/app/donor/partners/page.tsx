"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter } from "lucide-react";
import AddPartnerModal from "@/components/PartnersComponents/AddPartnerModal";
import PartnersTable from "@/components/PartnersComponents/PartnersTable";
import PartnersStats from "@/components/PartnersComponents/PartnersStats";
import PartnersChart from "@/components/PartnersComponents/PartnersChart";
import { partnersData } from "@/data/partnersData";
import { type Partner } from "@/types/partners";

export default function PartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>(partnersData);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddPartner = (newPartner: Partner): void => {
    setPartners((prev) => [...prev, newPartner]);
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
    </div>
  );
}