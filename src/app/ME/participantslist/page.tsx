"use client";

import { useState } from "react";
import { Users, Briefcase } from "lucide-react";
import StatsCards from "@/components/ME/ParticipantsList/StatsCards";
import EmploymentStats from "@/components/ME/ParticipantsList/EmploymentStats";
import ParticipantsTable from "@/components/ME/ParticipantsList/ParticipantsTable";
import FilterBar from "@/components/ME/ParticipantsList/FilterBar";
import AddParticipantModal from "@/components/ME/ParticipantsList/AddParticipantModal";
import { useGetMeParticipants } from "@/hooks/me/useMeParticipants";
import { useGetMeCohortsList, useGetMeCohortBatchesList } from "@/hooks/me/useMeCohorts";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ParticipantsListPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"participants" | "employment">("participants");
  const [page, setPage] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    cohortId: "",
    batchId: "",
    status: "",
  });

  useEffect(() => {
    if (user && user.role !== 'ME_OFFICER') {
      router.push('/facilitator/overview');
    }
  }, [user, router]);

  const { data: cohortsData = [] } = useGetMeCohortsList();
  const { data: batchesData = [] } = useGetMeCohortBatchesList();

  const apiFilters = {
    ...(filters.cohortId && { cohortId: filters.cohortId }),
    ...(filters.batchId && { batchId: filters.batchId }),
    ...(filters.status && { status: filters.status }),
  };

  const { data: participantsData, isLoading } = useGetMeParticipants(page, 20, apiFilters);

  const participants = (participantsData?.content || []).map((p: any) => ({
    id: p.id,
    name: `${p.firstName} ${p.lastName}`,
    cohort: p.cohort?.name || "N/A",
    gender: p.gender || "N/A",
    employment: p.employmentStatus || "Unknown",
    score: p.score,
    income: p.annualIncome || "-",
    status: p.status,
    email: p.email,
    studentId: p.studentId,
    joinDate: p.enrollmentDate || p.createdAt || new Date().toISOString(),
  }));

  const filteredParticipants = participants.filter((p: any) =>
    filters.search === "" ||
    p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    p.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
    p.studentId?.toLowerCase().includes(filters.search.toLowerCase())
  );

  const totalPages = participantsData?.totalPages || 0;

  const tabs = [
    { id: "participants", label: "Participants", icon: Users },
    { id: "employment", label: "Employment Tracking", icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-[#34597E]">Participants Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track participants and their employment outcomes</p>
        </div>
      </div>

      <div className="border-b border-gray-200 px-8">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#0B609D] text-[#0B609D] font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "participants" && (
        <>
          <StatsCards participants={filteredParticipants} />
          
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            cohorts={cohortsData}
            batches={batchesData}
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading participants…</p>
            </div>
          ) : (
            <ParticipantsTable
              participants={filteredParticipants}
              onAddClick={() => setIsAddModalOpen(true)}
              onView={(id) => console.log("View", id)}
              onEdit={(id) => console.log("Edit", id)}
              totalItems={participantsData?.totalElements || 0}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {activeTab === "employment" && (
        <>
          <EmploymentStats participants={filteredParticipants} />
          
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            cohorts={cohortsData}
            batches={batchesData}
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading employment data…</p>
            </div>
          ) : (
            <ParticipantsTable
              participants={filteredParticipants}
              onAddClick={() => setIsAddModalOpen(true)}
              onView={(id) => console.log("View", id)}
              onEdit={(id) => console.log("Edit", id)}
              totalItems={participantsData?.totalElements || 0}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <AddParticipantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
