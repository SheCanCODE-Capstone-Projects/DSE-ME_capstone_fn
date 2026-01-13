"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Users, Briefcase } from "lucide-react";
import { Participant } from "@/types/participant";

interface EditParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
  onUpdate: (participant: Participant) => void;
}

export default function EditParticipantModal({ isOpen, onClose, participant, onUpdate }: EditParticipantModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    cohort: string;
    gender: string;
    employment: string;
    income: string;
    schoolName: string;
    status: "Completed" | "In Progress" | "Not Started";
  }>({
    name: "",
    email: "",
    cohort: "",
    gender: "",
    employment: "",
    income: "",
    schoolName: "",
    status: "Not Started"
  });

  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name,
        email: participant.email,
        cohort: participant.cohort,
        gender: participant.gender,
        employment: participant.employment,
        income: participant.income,
        schoolName: participant.schoolName || "",
        status: participant.status
      });
    }
  }, [participant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (participant) {
      onUpdate({
        ...participant,
        ...formData
      });
      onClose();
    }
  };

  if (!isOpen || !participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-2xl p-6 z-10 w-96 max-w-full shadow-2xl border border-gray-200 transform transition-all duration-200 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Participant</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users size={16} className="inline mr-2" />
                Cohort
              </label>
              <select
                required
                value={formData.cohort}
                onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">Select Cohort</option>
                <option value="A-001">A-001</option>
                <option value="A-002">A-002</option>
                <option value="B-001">B-001</option>
                <option value="B-002">B-002</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase size={16} className="inline mr-2" />
              Employment Status
            </label>
            <select
              required
              value={formData.employment}
              onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">Select Employment Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {formData.employment !== "Student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
              <input
                type="text"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="e.g., $50,000"
              />
            </div>
          )}

          {formData.employment === "Student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                required
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter school name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Participant["status"] })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition"
            >
              Update Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}