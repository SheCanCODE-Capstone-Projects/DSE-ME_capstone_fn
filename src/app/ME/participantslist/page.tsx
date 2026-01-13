'use client';

import { useState } from 'react';
import { Download, Plus, Users, Award, TrendingUp, UserCheck, Eye, Edit, MoreVertical } from 'lucide-react';
import AddParticipantModal from '@/components/ME/Participant/AddParticipantModal';
import ViewParticipantModal from '@/components/ME/Participant/ViewParticipantModal';
import EditParticipantModal from '@/components/ME/Participant/EditParticipantModal';
import StatCard from '@/components/ui/statuscard';
import { Participant } from '@/types/participant';

const initialParticipants: Participant[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", cohort: "A-001", gender: "Female", employment: "Employed", score: 92, income: "$55,000", status: "Completed", joinDate: "2024-01-15" },
  { id: "2", name: "Michael Brown", email: "michael.brown@email.com", cohort: "A-001", gender: "Male", employment: "Employed", score: 78, income: "$48,000", status: "In Progress", joinDate: "2024-01-20" },
  { id: "3", name: "Emma Davis", email: "emma.davis@email.com", cohort: "A-002", gender: "Female", employment: "Self-Employed", score: 88, income: "$62,000", status: "Completed", joinDate: "2024-02-01" },
  { id: "4", name: "James Wilson", email: "james.wilson@email.com", cohort: "A-002", gender: "Male", employment: "Unemployed", score: null, income: "$0", status: "Not Started", joinDate: "2024-02-10" },
];

function StatsCards({ participants }: { participants: Participant[] }) {
  const totalParticipants = participants.length;
  const completedParticipants = participants.filter(p => p.status === "Completed").length;
  const avgScore = participants.filter(p => p.score).length > 0 
    ? Math.round(participants.filter(p => p.score).reduce((a,b)=>a+b.score!,0) / participants.filter(p=>p.score).length)
    : 0;
  const activeCohorts = new Set(participants.map(p => p.cohort)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-8">
      <StatCard 
        icon={<Users size={20} />} 
        title="Total Participants" 
        value={totalParticipants} 
        subtext={`+${Math.floor(totalParticipants * 0.1)} from last month`}
      />
      <StatCard 
        icon={<UserCheck size={20} />} 
        title="Completed" 
        value={completedParticipants} 
        subtext={`${Math.round((completedParticipants/totalParticipants)*100)}% completion rate`}
      />
      <StatCard 
        icon={<Award size={20} />} 
        title="Average Score" 
        value={`${avgScore}%`} 
        subtext="Target: 85%"
      />
      <StatCard 
        icon={<TrendingUp size={20} />} 
        title="Active Cohorts" 
        value={activeCohorts} 
        subtext="Currently running"
      />
    </div>
  );
}

function ParticipantsTable({ participants, onAddClick, onView, onEdit }: { 
  participants: Participant[], 
  onAddClick: () => void,
  onView: (id: string) => void,
  onEdit: (id: string) => void
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleViewParticipant = (id: string) => {
    onView(id);
    setActiveDropdown(null);
  };

  const handleEditParticipant = (id: string) => {
    onEdit(id);
    setActiveDropdown(null);
  };

  return (
    <div className="px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#34597E]">Participants Management</h2>
        <div className="flex gap-2">
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2 text-white bg-[#0B609D] rounded-lg hover:bg-[#095083]"
          >
            <Plus className="w-4 h-4" />
            Add Participant
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"><Download className="w-4 h-4" /> CSV</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"><Download className="w-4 h-4" /> PDF</button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#EEF4FB] text-[#0057B8] text-[13px] font-bold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Cohort</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Employment</th>
              <th className="px-6 py-4 text-center">Score</th>
              <th className="px-6 py-4 text-center">Annual Income</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {participants.map((p, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6 font-semibold text-slate-800">{p.name}</td>
                <td className="px-6 py-6">{p.cohort}</td>
                <td className="px-6 py-6">{p.gender}</td>
                <td className="px-6 py-6">{p.employment}</td>
                <td className="px-6 py-6 text-center font-bold text-[#0057B8]">{p.score ?? '-'}</td>
                <td className="px-6 py-6 text-center">{p.income}</td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Completed" ? "bg-green-100 text-green-700" :
                    p.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-center relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === p.id ? null : p.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  
                  {activeDropdown === p.id && (
                    <div className="absolute right-6 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                      <button
                        onClick={() => handleViewParticipant(p.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => handleEditParticipant(p.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
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

  return (
    <main className="flex-1 pb-10 min-h-screen">
      <div className="px-8 mb-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-1">Participants Management</h2>
        <p className="text-slate-500 mb-6">Track, filter, and manage all program participants</p>
      </div>

      <StatsCards participants={participants} />
      <ParticipantsTable 
        participants={participants} 
        onAddClick={() => setAddModalOpen(true)}
        onView={handleViewParticipant}
        onEdit={handleEditParticipant}
      />
      
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
    </main>
  );
}