"use client";

import { X, User, Mail, Users, Briefcase, Award, Calendar } from "lucide-react";
import { Participant } from "@/types/participant";

interface ViewParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
}

export default function ViewParticipantModal({ isOpen, onClose, participant }: ViewParticipantModalProps) {
  if (!isOpen || !participant) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-2xl p-6 z-10 w-96 max-w-full shadow-2xl border border-gray-200 transform transition-all duration-200 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Participant Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#0B609D] rounded-full flex items-center justify-center text-white font-semibold">
              {participant.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{participant.name}</h3>
              <p className="text-sm text-gray-500">{participant.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Users size={16} className="inline mr-2" />
                Cohort
              </label>
              <p className="text-gray-900">{participant.cohort}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <p className="text-gray-900">{participant.gender}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Briefcase size={16} className="inline mr-2" />
              Employment Status
            </label>
            <p className="text-gray-900">{participant.employment}</p>
          </div>

          {participant.schoolName && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <p className="text-gray-900">{participant.schoolName}</p>
            </div>
          )}

          {participant.employment !== "Student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
              <p className="text-gray-900">{participant.income}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Award size={16} className="inline mr-2" />
                Score
              </label>
              <p className="text-gray-900">{participant.score ? `${participant.score}%` : 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                {participant.status}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar size={16} className="inline mr-2" />
              Join Date
            </label>
            <p className="text-gray-900">{new Date(participant.joinDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}