"use client";

import { useState, useEffect } from "react";
import { X, Users, Calendar, BookOpen } from "lucide-react";
import { Cohort } from "@/types/cohort";
import { useGetMeCourses, useCreateMeCohort } from "@/hooks/me/useMeCohorts";
import toast from "react-hot-toast";

interface AddCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  onCreate: (cohort: Cohort | null) => void;
}

export default function AddCohortModal({ isOpen, onClose, onCreate }: AddCohortModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    startDate: "",
    endDate: "",
    maxParticipants: 30,
  });

  const { data: courses = [], isLoading: coursesLoading } = useGetMeCourses();
  const createCohort = useCreateMeCohort();

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        courseId: "",
        startDate: "",
        endDate: "",
        maxParticipants: 30,
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.startDate) {
      toast.error("Please select a course and start date.");
      return;
    }
    try {
      const created = await createCohort.mutateAsync({
        name: formData.name,
        courseId: formData.courseId,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        maxParticipants: formData.maxParticipants,
      });
      toast.success("Track created successfully. You can now assign facilitators.");
      const course = courses.find((c) => c.id === formData.courseId);
      onCreate({
        id: created.id,
        name: created.name,
        startDate: created.startDate,
        endDate: created.endDate ?? "",
        participantCount: created.currentParticipants ?? 0,
        isActive: (created.status ?? "").toLowerCase() === "active",
        courseName: created.course?.name ?? course?.name,
      });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create track.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl p-6 z-10 w-full max-w-md shadow-2xl border border-gray-200 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Cohort</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          A track is one course within a cohort batch. You can assign multiple facilitators after creation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-2" />
              Track Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="e.g. Web Development Track"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen size={16} className="inline mr-2" />
              Course *
            </label>
            <select
              required
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              disabled={coursesLoading}
            >
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}{c.code ? ` (${c.code})` : ""}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max participants</label>
            <input
              type="number"
              min={1}
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value, 10) || 30 })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
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
              disabled={createCohort.isPending}
              className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition disabled:opacity-60"
            >
              {createCohort.isPending ? "Creating…" : "Create Track"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
