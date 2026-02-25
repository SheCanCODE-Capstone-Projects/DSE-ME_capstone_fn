"use client";

import { useEffect, useState } from "react";
import { X, Users, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateMeCohortBatch } from "@/hooks/me/useMeCohorts";

interface AddCohortBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCohortBatchModal({ isOpen, onClose }: AddCohortBatchModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const createBatch = useCreateMeCohortBatch();

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", startDate: "", endDate: "" });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBatch.mutateAsync({
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
      });
      toast.success("Cohort registered successfully.");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create cohort.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-2xl p-6 z-10 w-full max-w-md shadow-2xl border border-gray-200 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Register Cohort (Batch)</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          This is the main cohort intake (e.g. “She Can Code 2024 Cohort”). Later you can add multiple courses + facilitators inside it.
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
              placeholder="e.g. She Can Code 2024 Cohort"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Start Date
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
              disabled={createBatch.isPending}
              className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition disabled:opacity-60"
            >
              {createBatch.isPending ? "Saving…" : "Register Cohort"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

