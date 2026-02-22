"use client";

import { useState, useEffect } from "react";
import Modal from "../Facilitator/Modal";
import { meApi } from "@/lib/meApi";
import toast from "react-hot-toast";

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  durationWeeks: number;
  level: string;
}

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSuccess: () => void;
}

export default function EditCourseModal({
  isOpen,
  onClose,
  course,
  onSuccess,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    durationWeeks: 12,
    level: "BEGINNER",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        description: course.description || "",
        durationWeeks: course.durationWeeks,
        level: course.level,
      });
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    setIsSubmitting(true);
    try {
      await meApi.updateCourse(course.id, {
        name: formData.name,
        code: formData.code,
        description: formData.description,
        level: formData.level,
        durationWeeks: formData.durationWeeks,
        maxParticipants: 30,
      });
      toast.success("Course updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error((error as Error).message || "Failed to update course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Course">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Code
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            required
            disabled
            title="Course code cannot be changed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (weeks)
            </label>
            <input
              type="number"
              min="1"
              value={formData.durationWeeks}
              onChange={(e) => handleChange("durationWeeks", parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => handleChange("level", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
