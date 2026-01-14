import { useState } from 'react';
import { Download, Plus, Eye, Edit, MoreVertical } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import { Participant } from '@/types/participant';

interface ParticipantsTableProps {
  participants: Participant[];
  onAddClick: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ParticipantsTable({ 
  participants, 
  onAddClick, 
  onView, 
  onEdit, 
  totalItems, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ParticipantsTableProps) {
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" /> PDF
          </button>
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
              <th className="px-6 py-4 text-center">Annual Income (RWF)</th>
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
                <td className="px-6 py-6 text-center">{p.employment === "Student" ? '-' : p.income}</td>
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
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}