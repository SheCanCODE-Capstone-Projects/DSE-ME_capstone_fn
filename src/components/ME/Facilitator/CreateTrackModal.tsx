"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useCreateMeCourse } from "@/hooks/me/useMeCohorts";
import toast from "react-hot-toast";

interface CreateTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LEVEL_OPTIONS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

export default function CreateTrackModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTrackModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("BEGINNER");
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [maxParticipants, setMaxParticipants] = useState(30);

  const createCourse = useCreateMeCourse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      toast.error("Name and code are required.");
      return;
    }
    try {
      await createCourse.mutateAsync({
        name: name.trim(),
        code: code.trim(),
        description: description.trim() || undefined,
        level,
        durationWeeks,
        maxParticipants,
      });
      toast.success("Track created successfully.");
      setName("");
      setCode("");
      setDescription("");
      setLevel("BEGINNER");
      setDurationWeeks(12);
      setMaxParticipants(30);
      onClose();
      onSuccess?.();
    } catch (err) {
      toast.error((err as Error).message ?? "Failed to create track.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create track (course)">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Track name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g. Business Skills"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g. BS101"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Brief description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            {LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
            <input
              type="number"
              min={1}
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value) || 12)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max participants</label>
            <input
              type="number"
              min={1}
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value) || 30)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="px-4 py-2 rounded-md border" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-sky-600 text-white disabled:opacity-50"
            disabled={createCourse.isPending}
          >
            {createCourse.isPending ? "Creating…" : "Create track"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
