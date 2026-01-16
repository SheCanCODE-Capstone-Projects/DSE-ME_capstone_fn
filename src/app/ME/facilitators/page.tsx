"use client";

import { useState, useEffect } from "react";
import { UserCheck, Search, Filter } from "lucide-react";
import FacilitatorCard from "@/components/ME/Facilitator/FacilitatorCard";
import AssignCohortsModal from "@/components/ME/Facilitator/AssignCohortsModal";
import AssignCoursesModal from "@/components/ME/Facilitator/AssignCoursesModal";
import AccessRequestsModal from "@/components/ME/Facilitator/AccessRequestsModal";
import { Facilitator } from "@/types/facilitator";
import toast from "react-hot-toast";

const facilitatorsData: Facilitator[] = [
  { id: "1", name: "John Smith", email: "john@example.com", region: "North Region", participantsCount: 45, isActive: true,
    cohorts: [{ id: "c1", name: "Cohort 2024-Q1" }], courses: [{ id: "cs1", name: "Business Skills" }] },
  { id: "2", name: "Jane Doe", email: "jane@example.com", region: "South Region", participantsCount: 30, isActive: false,
    cohorts: [{ id: "c2", name: "Cohort 2024-Q2" }], courses: [{ id: "cs2", name: "Leadership Dev" }] },
];

const allCohorts = [
  { id: "c1", name: "Cohort 2024-Q1" },
  { id: "c2", name: "Cohort 2024-Q2" },
  { id: "c3", name: "Cohort 2024-Q3" },
];

const allCourses = [
  { id: "cs1", name: "Business Skills" },
  { id: "cs2", name: "Leadership Development" },
  { id: "cs3", name: "Digital Marketing" },
  { id: "cs4", name: "Project Management" },
];

export default function FacilitatorsPage() {
  const [facilitators, setFacilitators] = useState<Facilitator[]>(facilitatorsData);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(null);
  const [cohortModalOpen, setCohortModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [accessRequestsOpen, setAccessRequestsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    loadAccessRequests();
    // Set up interval to check for new requests
    const interval = setInterval(loadAccessRequests, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadAccessRequests = async () => {
    try {
      // Load from localStorage
      const requests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      const pendingRequests = requests.filter((r: any) => r.status === 'pending');
      setAccessRequests(pendingRequests);
    } catch (error) {
      console.error('Failed to load access requests:', error);
    }
  };

  const filteredFacilitators = facilitators.filter(f => {
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

  const handleAssignCourses = (facilitator: Facilitator) => {
    setSelectedFacilitator(facilitator);
    setCourseModalOpen(true);
  };

  const handleSaveCohorts = (selectedIds: string[]) => {
    if (selectedFacilitator) {
      const updatedCohorts = allCohorts.filter(c => selectedIds.includes(c.id));
      setFacilitators(prev => prev.map(f => 
        f.id === selectedFacilitator.id 
          ? { ...f, cohorts: updatedCohorts }
          : f
      ));
    }
  };

  const handleSaveCourses = (selectedIds: string[]) => {
    if (selectedFacilitator) {
      const updatedCourses = allCourses.filter(c => selectedIds.includes(c.id));
      setFacilitators(prev => prev.map(f => 
        f.id === selectedFacilitator.id 
          ? { ...f, courses: updatedCourses }
          : f
      ));
    }
  };

  const handleToggleActive = (id: string) => {
    setFacilitators(prev =>
      prev.map(f => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
  };

  const handleApproveRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const request = accessRequests.find(r => r.id === requestId);
      if (!request) return;

      // Update request status in localStorage
      const allRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      const updatedRequests = allRequests.map((r: any) => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      );
      localStorage.setItem('accessRequests', JSON.stringify(updatedRequests));

      const newFacilitator: Facilitator = {
        id: `fac_${Date.now()}`,
        name: request.userEmail.split('@')[0],
        email: request.userEmail,
        region: "North Region",
        participantsCount: 0,
        isActive: true,
        cohorts: [],
        courses: [allCourses[0]]
      };

      setFacilitators(prev => [...prev, newFacilitator]);
      await loadAccessRequests();
      toast.success(`${request.userEmail} has been approved as ${request.requestedRole}!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve request');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const request = accessRequests.find(r => r.id === requestId);
      
      // Update request status in localStorage
      const allRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      const updatedRequests = allRequests.map((r: any) => 
        r.id === requestId ? { ...r, status: 'rejected' } : r
      );
      localStorage.setItem('accessRequests', JSON.stringify(updatedRequests));
      
      await loadAccessRequests();
      toast.success(`Access request from ${request?.userEmail} has been rejected.`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search and Filter Section */}
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
            onAssignCourse={() => handleAssignCourses(f)}
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
        courses={allCourses}
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onSave={handleSaveCourses}
      />

      <AccessRequestsModal
        isOpen={accessRequestsOpen}
        onClose={() => setAccessRequestsOpen(false)}
        requests={accessRequests}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        loading={loading}
      />
    </div>
  );
}