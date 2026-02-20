"use client";

import { useState, useEffect } from "react";
import { UserCheck, Search, Filter, Plus } from "lucide-react";
import FacilitatorCard from "@/components/ME/Facilitator/FacilitatorCard";
import AssignCohortsModal from "@/components/ME/Facilitator/AssignCohortsModal";
import AssignCoursesModal from "@/components/ME/Facilitator/AssignCoursesModal";
import CreateTrackModal from "@/components/ME/Facilitator/CreateTrackModal";
import AccessRequestsModal from "@/components/ME/Facilitator/AccessRequestsModal";
import { Facilitator } from "@/types/facilitator";
import { RoleRequestResponse } from "@/types/auth";
import { useGetPendingAccessRequests, useApproveAccessRequest, useRejectAccessRequest } from "@/hooks/auth/useAccessRequests";
import {
  useGetMeFacilitators,
  useGetMeCohortBatchesList,
  useGetMeCourses,
} from "@/hooks/me/useMeCohorts";
import { useQueryClient } from "@tanstack/react-query";
import { meApi } from "@/lib/meApi";
import toast from "react-hot-toast";

export default function FacilitatorsPage() {
  const queryClient = useQueryClient();
  const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(null);
  const [cohortModalOpen, setCohortModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [createTrackModalOpen, setCreateTrackModalOpen] = useState(false);
  const [accessRequestsOpen, setAccessRequestsOpen] = useState(false);

  const { data: facilitatorsList = [], isLoading: facilitatorsLoading } = useGetMeFacilitators();
  const { data: cohortBatchesList = [] } = useGetMeCohortBatchesList();
  const { data: tracksList = [] } = useGetMeCourses();

  const { data: accessRequestsData, refetch } = useGetPendingAccessRequests() as { data?: { content: RoleRequestResponse[] }; refetch: () => void };
  const approveRequest = useApproveAccessRequest();
  const rejectRequest = useRejectAccessRequest();

  const accessRequests: RoleRequestResponse[] = accessRequestsData?.content || [];

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const allCohorts = cohortBatchesList.map((b) => ({ id: b.id, name: b.name }));
  const allTracks = tracksList.map((c) => ({ id: c.id, name: c.name }));

  const facilitators: Facilitator[] = facilitatorsList;

  const filteredFacilitators = facilitators.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "all" || f.region === regionFilter;
    const matchesActive =
      activeFilter === "all" ||
      (activeFilter === "active" && f.isActive) ||
      (activeFilter === "inactive" && !f.isActive);
    return matchesSearch && matchesRegion && matchesActive;
  });

  const handleAssignCohorts = (facilitator: Facilitator) => {
    setSelectedFacilitator(facilitator);
    setCohortModalOpen(true);
  };

  const handleAssignTracks = (facilitator: Facilitator) => {
    setSelectedFacilitator(facilitator);
    setCourseModalOpen(true);
  };

  const handleSaveCohorts = async (selectedIds: string[]) => {
    if (!selectedFacilitator) return;
    try {
      await meApi.setFacilitatorCohortBatches(selectedFacilitator.id, selectedIds);
      await queryClient.invalidateQueries({ queryKey: ["me", "facilitators"] });
      toast.success("Cohorts updated.");
    } catch (err) {
      toast.error((err as Error).message ?? "Failed to update cohorts.");
    }
  };

  const handleSaveTracks = async (selectedIds: string[]) => {
    if (!selectedFacilitator) return;
    const currentIds = selectedFacilitator.courses.map((c) => c.id);
    const toAdd = selectedIds.filter((id) => !currentIds.includes(id));
    const toRemove = currentIds.filter((id) => !selectedIds.includes(id));
    try {
      for (const courseId of toAdd) {
        await meApi.assignCourseToFacilitator(selectedFacilitator.id, courseId);
      }
      for (const courseId of toRemove) {
        await meApi.removeCourseFromFacilitator(selectedFacilitator.id, courseId);
      }
      await queryClient.invalidateQueries({ queryKey: ["me", "facilitators"] });
      toast.success("Tracks updated.");
    } catch (err) {
      toast.error((err as Error).message ?? "Failed to update tracks.");
    }
  };

  const handleToggleActive = (_id: string) => {
    // Optional: wire to backend if facilitator active/inactive is persisted
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveRequest.mutateAsync(requestId);
      refetch();
      toast.success("Access request approved successfully!");
    } catch (error) {
      toast.error((error as Error).message || "Failed to approve request");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectRequest.mutateAsync(requestId);
      refetch();
      toast.success("Access request rejected successfully!");
    } catch (error) {
      toast.error((error as Error).message || "Failed to reject request");
    }
  };

  if (facilitatorsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading facilitators…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search facilitators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="North Region">North Region</option>
              <option value="South Region">South Region</option>
              <option value="East Region">East Region</option>
              <option value="West Region">West Region</option>
            </select>
          </div>

          <select
            value={activeFilter}
            onChange={(e) =>
              setActiveFilter(e.target.value as "all" | "active" | "inactive")
            }
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="button"
            onClick={() => setCreateTrackModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
          >
            <Plus size={16} />
            Create track
          </button>

          <button
            onClick={() => setAccessRequestsOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7a] transition"
          >
            <UserCheck size={16} />
            Access Requests
            {accessRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {accessRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {filteredFacilitators.map((f) => (
          <FacilitatorCard
            key={f.id}
            facilitator={f}
            onAssignCohort={() => handleAssignCohorts(f)}
            onAssignCourse={() => handleAssignTracks(f)}
            onToggleActive={handleToggleActive}
          />
        ))}

        {filteredFacilitators.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No facilitators found.
          </p>
        )}
      </div>

      <AssignCohortsModal
        facilitator={selectedFacilitator}
        cohorts={allCohorts}
        isOpen={cohortModalOpen}
        onClose={() => setCohortModalOpen(false)}
        onSave={handleSaveCohorts}
      />

      <AssignCoursesModal
        facilitator={selectedFacilitator}
        courses={allTracks}
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onSave={handleSaveTracks}
      />

      <CreateTrackModal
        isOpen={createTrackModalOpen}
        onClose={() => setCreateTrackModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["me", "courses"] })}
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
