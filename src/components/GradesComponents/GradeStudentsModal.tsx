import React, { useState, useEffect, useMemo } from "react";
import { X, CheckCircle, Clock } from "lucide-react";
import { Assignment, Student } from "@/types/assignment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  students: Student[];
  onSaveGrades: (grades: Record<string, number>) => void;
};

export default function GradeStudentsModal({ isOpen, onClose, assignment, students, onSaveGrades }: Props) {
  const [grades, setGrades] = useState<Record<string, number>>({});

  const stats = useMemo(() => {
    const gradedCount = Object.keys(grades).filter(key => grades[key] !== undefined).length;
    const remainingCount = students.length - gradedCount;
    return { gradedCount, remainingCount };
  }, [grades, students.length]);


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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold" style={{ color: "#0B609D" }}>
              Grade Students: {assignment.title}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {assignment.course} - {assignment.chapter}
            </p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: "#EEF3FD" }}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={16} style={{ color: "#0B609D" }} />
              <span className="text-xs text-gray-600">Graded</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: "#0B609D" }}>
              {stats.gradedCount}
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-yellow-600" />
              <span className="text-xs text-gray-600">Remaining</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.remainingCount}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {students.map(student => {
            const hasGrade = grades[student.id] !== undefined;
            return (
              <div key={student.id} className={`flex items-center justify-between gap-4 px-4 py-2 rounded-lg ${
                hasGrade ? "border-2" : "bg-yellow-50"
              }`} style={hasGrade ? { backgroundColor: "#EEF3FD", borderColor: "#0B609D" } : {}}>
                <div className="flex items-center gap-2 flex-1">
                  {hasGrade && <CheckCircle size={16} style={{ color: "#0B609D" }} />}
                  {!hasGrade && <Clock size={16} className="text-yellow-600" />}
                  <span className="text-gray-700 font-medium">{student.name}</span>
                </div>
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
            );
          })}
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
            className="px-4 py-2 text-white rounded-2xl transition"
            style={{ background: "linear-gradient(to right, #0B609D, #6b7280)" }}
          >
            Save Grades
          </button>
        </div>
      </div>
    </div>
  );
}
