'use client';

import { useState } from 'react';
import { Users, UserPlus, Briefcase } from 'lucide-react';
import AddParticipantModal from '@/components/ME/Participant/AddParticipantModal';
import ViewParticipantModal from '@/components/ME/Participant/ViewParticipantModal';
import EditParticipantModal from '@/components/ME/Participant/EditParticipantModal';
import AddCohortModal from '@/components/ME/Participant/AddCohortModal';
import EmploymentManagementModal from '@/components/ME/Participant/EmploymentManagementModal';
import StatsCards from '@/components/ME/ParticipantsList/StatsCards';
import ParticipantsTable from '@/components/ME/ParticipantsList/ParticipantsTable';
import FilterBar from '@/components/ME/ParticipantsList/FilterBar';
import EmploymentStats from '@/components/ME/ParticipantsList/EmploymentStats';
import { Participant } from '@/types/participant';
import { Cohort } from '@/types/cohort';

const initialCohorts: Cohort[] = [
  { id: "1", name: "A-001", description: "First cohort of 2024", startDate: "2024-01-15", endDate: "2024-06-15", participantCount: 2, isActive: true },
  { id: "2", name: "A-002", description: "Second cohort of 2024", startDate: "2024-02-01", endDate: "2024-07-01", participantCount: 2, isActive: true },
  { id: "3", name: "B-001", description: "Advanced cohort", startDate: "2024-03-01", endDate: "2024-08-01", participantCount: 0, isActive: true },
  { id: "4", name: "B-002", description: "Professional development cohort", startDate: "2024-04-01", endDate: "2024-09-01", participantCount: 0, isActive: false }
];

const initialParticipants: Participant[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", cohort: "A-001", gender: "Female", employment: "Employed", score: 92, income: "5,500,000", status: "Completed", joinDate: "2024-01-15" },
  { id: "2", name: "Michael Brown", email: "michael.brown@email.com", cohort: "A-001", gender: "Male", employment: "Employed", score: 78, income: "4,800,000", status: "In Progress", joinDate: "2024-01-20" },
  { id: "3", name: "Emma Davis", email: "emma.davis@email.com", cohort: "A-002", gender: "Female", employment: "Self-Employed", score: 88, income: "6,200,000", status: "Completed", joinDate: "2024-02-01" },
  { id: "4", name: "James Wilson", email: "james.wilson@email.com", cohort: "A-002", gender: "Male", employment: "Unemployed", score: null, income: "0", status: "Not Started", joinDate: "2024-02-10" },
];

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [cohorts, setCohorts] = useState<Cohort[]>(initialCohorts);
  const [activeTab, setActiveTab] = useState<'all' | 'cohorts' | 'employment'>('all');
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
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

  const handleAddCohort = (newCohort: Omit<Cohort, "id" | "participantCount">) => {
    const cohort: Cohort = {
      ...newCohort,
      id: `cohort_${Date.now()}`,
      participantCount: 0
    };
    setCohorts(prev => [...prev, cohort]);
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
      
      <AddCohortModal
        isOpen={cohortModalOpen}
        onClose={() => setCohortModalOpen(false)}
        onCreate={handleAddCohort}
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