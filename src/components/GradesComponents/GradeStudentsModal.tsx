"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Assignment, Student } from "@/types/assignment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  onSaveGrades: (grades: Record<string, number>) => void;
};

// Dummy student list
const dummyStudents: Student[] = [
  { id: "s1", name: "Alice Johnson" },
  { id: "s2", name: "Bob Smith" },
  { id: "s3", name: "Charlie Brown" },
];

export default function GradeStudentsModal({ isOpen, onClose, assignment, onSaveGrades }: Props) {
  const [grades, setGrades] = useState<Record<string, number>>({});

  // Populate existing grades if any
  useEffect(() => {
    setGrades(assignment.grades || {});
  }, [assignment]);

  const handleChange = (studentId: string, value: string) => {
    const numeric = Number(value);
    if (!isNaN(numeric) && numeric >= 0 && numeric <= assignment.maxScore) {
      setGrades(prev => ({ ...prev, [studentId]: numeric }));
    }
  };

  const handleSave = () => {
    onSaveGrades(grades);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-6 z-10 max-h-[90vh] overflow-y-auto w-full sm:w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-sky-900">
            Grade Students: {assignment.title}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3">
          {dummyStudents.map(student => (
            <div key={student.id} className="flex items-center justify-between gap-4 bg-sky-50 px-4 py-2 rounded-lg">
              <span className="text-gray-700 font-medium">{student.name}</span>
              <input
                type="number"
                min={0}
                max={assignment.maxScore}
                value={grades[student.id] ?? ""}
                placeholder={`Max ${assignment.maxScore}`}
                onChange={e => handleChange(student.id, e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 w-20 text-center"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-2xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white rounded-2xl bg-gradient-to-r from-sky-700 to-gray-600 hover:from-sky-800 hover:to-gray-700 transition"
          >
            Save Grades
          </button>
        </div>
      </div>
    </div>
  );
}
