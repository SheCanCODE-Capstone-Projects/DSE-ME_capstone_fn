'use client';

import { useState, useMemo } from 'react';
import { Users, UserPlus, Briefcase } from 'lucide-react';
import AddParticipantModal from '@/components/ME/Participant/AddParticipantModal';
import ViewParticipantModal from '@/components/ME/Participant/ViewParticipantModal';
import EditParticipantModal from '@/components/ME/Participant/EditParticipantModal';
import AddCohortBatchModal from '@/components/ME/Participant/AddCohortBatchModal';
import EmploymentManagementModal from '@/components/ME/Participant/EmploymentManagementModal';
import StatsCards from '@/components/ME/ParticipantsList/StatsCards';
import ParticipantsTable from '@/components/ME/ParticipantsList/ParticipantsTable';
import FilterBar from '@/components/ME/ParticipantsList/FilterBar';
import EmploymentStats from '@/components/ME/ParticipantsList/EmploymentStats';
import FacilitatorDashboard from '@/components/ME/ParticipantsList/FacilitatorDashboard';
import { Participant } from '@/types/participant';
import { Cohort } from '@/types/cohort';
import { Facilitator } from '@/types/facilitator';
import { useGetFacilitators, useGetFacilitatorStats } from '@/hooks/facilitators/useFacilitators';
import { useGetMeCohortBatchesList } from '@/hooks/me/useMeCohorts';

const initialParticipants: Participant[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", cohort: "A-001", gender: "Female", employment: "Employed", score: 92, income: "5,500,000", status: "Completed", joinDate: "2024-01-15" },
  { id: "2", name: "Michael Brown", email: "michael.brown@email.com", cohort: "A-001", gender: "Male", employment: "Employed", score: 78, income: "4,800,000", status: "In Progress", joinDate: "2024-01-20" },
  { id: "3", name: "Emma Davis", email: "emma.davis@email.com", cohort: "A-002", gender: "Female", employment: "Self-Employed", score: 88, income: "6,200,000", status: "Completed", joinDate: "2024-02-01" },
  { id: "4", name: "James Wilson", email: "james.wilson@email.com", cohort: "A-002", gender: "Male", employment: "Unemployed", score: null, income: "0", status: "Not Started", joinDate: "2024-02-10" },
];

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const { data: apiBatches = [], isLoading: cohortsLoading } = useGetMeCohortBatchesList();
  const cohorts: Cohort[] = useMemo(() => apiBatches.map((b) => ({
    id: b.id,
    name: b.name,
    startDate: b.startDate,
    endDate: b.endDate ?? '',
    participantCount: 0,
    isActive: (b.status ?? '').toLowerCase() === 'active',
  })), [apiBatches]);
  const [activeTab, setActiveTab] = useState<'all' | 'cohorts' | 'employment'>('all');
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [selectedFacilitatorId, setSelectedFacilitatorId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employmentFilter, setEmploymentFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cohortModalOpen, setCohortModalOpen] = useState(false);
  const [employmentModalOpen, setEmploymentModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // Fetch facilitators and stats
  const { data: facilitatorsData, isLoading: facilitatorsLoading } = useGetFacilitators();
  const facilitators: Facilitator[] = facilitatorsData?.content || [];
  const selectedFacilitator = facilitators.find(f => f.id === selectedFacilitatorId) || null;
  
  const { data: facilitatorStats, isLoading: statsLoading } = useGetFacilitatorStats(selectedFacilitatorId);

  const handleAddParticipant = (newParticipant: Omit<Participant, "id">) => {
    const participant: Participant = {
      ...newParticipant,
      id: `participant_${Date.now()}`
    };
    setParticipants(prev => [...prev, participant]);
    setAddModalOpen(false);
  };

  const handleViewParticipant = (id: string) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setViewModalOpen(true);
    }
  };

  const handleEditParticipant = (id: string) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setEditModalOpen(true);
    }
  };

  const handleUpdateParticipant = (updatedParticipant: Participant) => {
    setParticipants(prev => 
      prev.map(p => p.id === updatedParticipant.id ? updatedParticipant : p)
    );
  };

  const handleAddCohort = () => {
    setCohortModalOpen(false);
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCohort = selectedCohort === 'all' || participant.cohort === selectedCohort;
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    const matchesEmployment = employmentFilter === 'all' || participant.employment === employmentFilter;
    const matchesGender = genderFilter === 'all' || participant.gender === genderFilter;
    
    return matchesSearch && matchesCohort && matchesStatus && matchesEmployment && matchesGender;
  });

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateEmployment = (participantId: string, employment: string, income?: string) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participantId 
          ? { ...p, employment, income: income || p.income }
          : p
      )
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cohorts':
        return (
          <div className="space-y-6">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              employmentFilter={employmentFilter}
              onEmploymentChange={setEmploymentFilter}
              selectedCohort={selectedCohort}
              onCohortChange={setSelectedCohort}
              cohorts={cohorts}
              participants={participants}
              onAddCohort={() => setCohortModalOpen(true)}
              type="cohorts"
            />
            <ParticipantsTable 
              participants={paginatedParticipants} 
              onAddClick={() => setAddModalOpen(true)}
              onView={handleViewParticipant}
              onEdit={handleEditParticipant}
              totalItems={filteredParticipants.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        );
      case 'employment':
        return (
          <div className="space-y-6">
            <EmploymentStats participants={participants} />
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              employmentFilter={employmentFilter}
              onEmploymentChange={setEmploymentFilter}
              genderFilter={genderFilter}
              onGenderChange={setGenderFilter}
              onUpdateEmployment={() => setEmploymentModalOpen(true)}
              type="employment"
            />
            <ParticipantsTable 
              participants={paginatedParticipants} 
              onAddClick={() => setAddModalOpen(true)}
              onView={handleViewParticipant}
              onEdit={handleEditParticipant}
              totalItems={filteredParticipants.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <StatsCards participants={participants} />
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              employmentFilter={employmentFilter}
              onEmploymentChange={setEmploymentFilter}
              selectedCohort={selectedCohort}
              onCohortChange={setSelectedCohort}
              cohorts={cohorts}
              type="all"
            />
            <ParticipantsTable 
              participants={paginatedParticipants} 
              onAddClick={() => setAddModalOpen(true)}
              onView={handleViewParticipant}
              onEdit={handleEditParticipant}
              totalItems={filteredParticipants.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        );
    }
  };

  return (
    <div>
      {/* Facilitator Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View by Facilitator
            </label>
            <select
              value={selectedFacilitatorId}
              onChange={(e) => setSelectedFacilitatorId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              disabled={facilitatorsLoading}
            >
              <option value="">All Facilitators</option>
              {facilitators.map((facilitator) => (
                <option key={facilitator.id} value={facilitator.id}>
                  {facilitator.name} ({facilitator.participantsCount} participant{facilitator.participantsCount !== 1 ? 's' : ''})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Facilitator Dashboard */}
      {selectedFacilitatorId && (
        <FacilitatorDashboard
          facilitator={selectedFacilitator}
          stats={facilitatorStats}
          isLoading={statsLoading}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'all'
                ? 'bg-[#0B609D] text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            All Participants
          </button>
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'cohorts'
                ? 'bg-[#0B609D] text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            By Cohorts
          </button>
          <button
            onClick={() => setActiveTab('employment')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'employment'
                ? 'bg-[#0B609D] text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-4 h-4 inline mr-2" />
            Employment
          </button>
        </div>
      </div>

      {renderTabContent()}
      
      <AddParticipantModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreate={handleAddParticipant}
        cohorts={cohorts}
      />
      
      <ViewParticipantModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        participant={selectedParticipant}
      />
      
      <EditParticipantModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        participant={selectedParticipant}
        onUpdate={handleUpdateParticipant}
      />
      
      <AddCohortBatchModal
        isOpen={cohortModalOpen}
        onClose={() => setCohortModalOpen(false)}
      />
      
      <EmploymentManagementModal
        isOpen={employmentModalOpen}
        onClose={() => setEmploymentModalOpen(false)}
        participants={participants}
        onUpdateEmployment={handleUpdateEmployment}
      />
    </div>
  );
}