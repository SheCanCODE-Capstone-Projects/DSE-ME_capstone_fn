"use client";

import { useState, useEffect } from "react";
import { X, Users, Calendar, BookOpen, UserCircle } from "lucide-react";
import { Cohort } from "@/types/cohort";
import { useGetMeCourses, useGetMeFacilitatorsForCohort, useCreateMeCohort } from "@/hooks/me/useMeCohorts";
import toast from "react-hot-toast";

interface AddCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with new cohort when created (includes id and participantCount from API) */
  onCreate: (cohort: Cohort | null) => void;
}

/** Helper: format facilitator display name */
function facilitatorLabel(firstName?: string | null, lastName?: string | null): string {
  const parts = [firstName, lastName].filter(Boolean);
  return parts.length ? parts.join(" ") : "— No facilitator —";
}

export default function AddCohortModal({ isOpen, onClose, onCreate }: AddCohortModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    facilitatorId: "",
    startDate: "",
    endDate: "",
    maxParticipants: 30,
  });

  const { data: courses = [], isLoading: coursesLoading } = useGetMeCourses();
  const { data: facilitators = [], isLoading: facilitatorsLoading } = useGetMeFacilitatorsForCohort();
  const createCohort = useCreateMeCohort();

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        courseId: "",
        facilitatorId: "",
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
        facilitatorId: formData.facilitatorId || undefined,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        maxParticipants: formData.maxParticipants,
      });
      toast.success("Cohort created successfully.");
      const course = courses.find((c) => c.id === formData.courseId);
      const fac = facilitators.find((f) => f.id === formData.facilitatorId);
      onCreate({
        id: created.id,
        name: created.name,
        startDate: created.startDate,
        endDate: created.endDate ?? "",
        participantCount: created.currentParticipants ?? 0,
        isActive: (created.status ?? "").toLowerCase() === "active",
        courseName: created.course?.name ?? course?.name,
        facilitatorName: created.facilitator
          ? facilitatorLabel(created.facilitator.firstName, created.facilitator.lastName)
          : fac
            ? facilitatorLabel(fac.firstName, fac.lastName)
            : undefined,
      });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create cohort.");
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
          A cohort is one course with one facilitator. Same organization can have multiple cohorts (e.g. Web Dev with Facilitator A, Data Science with Facilitator B).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-2" />
              Cohort Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="e.g. She Can Code – Web Dev 2024"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCircle size={16} className="inline mr-2" />
              Facilitator
            </label>
            <select
              value={formData.facilitatorId}
              onChange={(e) => setFormData({ ...formData, facilitatorId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              disabled={facilitatorsLoading}
            >
              <option value="">Optional – assign later</option>
              {facilitators.map((f) => (
                <option key={f.id} value={f.id}>
                  {facilitatorLabel(f.firstName, f.lastName)}
                </option>
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
              {createCohort.isPending ? "Creating…" : "Add Cohort"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
