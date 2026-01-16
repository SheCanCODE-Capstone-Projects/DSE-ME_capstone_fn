"use client";
import React, { useMemo, useState } from "react";
import { X, Award, TrendingUp, TrendingDown, Minus, Edit2, Save } from "lucide-react";
import { Assignment, Student } from "@/types/assignment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  students: Student[];
  onSaveGrades?: (grades: Record<string, number>) => void;
};

export default function ViewGradesModal({ isOpen, onClose, assignment, students, onSaveGrades }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGrades, setEditedGrades] = useState<Record<string, number>>(assignment.grades || {});
  const stats = useMemo(() => {
    const grades = isEditing ? editedGrades : (assignment.grades || {});
    const gradeValues = Object.values(grades);
    
    if (gradeValues.length === 0) {
      return { average: 0, highest: 0, lowest: 0, passRate: 0 };
    }

    const sum = gradeValues.reduce((a, b) => a + b, 0);
    const average = sum / gradeValues.length;
    const highest = Math.max(...gradeValues);
    const lowest = Math.min(...gradeValues);
    const passRate = (gradeValues.filter(g => g >= assignment.maxScore * 0.5).length / gradeValues.length) * 100;

    return { average, highest, lowest, passRate };
  }, [assignment, isEditing, editedGrades]);

  const getGradeColor = (grade: number) => {
    const percentage = (grade / assignment.maxScore) * 100;
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getPerformanceIcon = (grade: number) => {
    const percentage = (grade / assignment.maxScore) * 100;
    if (percentage >= 80) return <TrendingUp size={16} className="text-green-600" />;
    if (percentage >= 60) return <Minus size={16} className="text-yellow-600" />;
    return <TrendingDown size={16} className="text-red-600" />;
  };

  const handleGradeChange = (studentId: string, value: string) => {
    const numeric = Number(value);
    if (!isNaN(numeric) && numeric >= 0 && numeric <= assignment.maxScore) {
      setEditedGrades(prev => ({ ...prev, [studentId]: numeric }));
    }
  };

  const handleSave = () => {
    if (onSaveGrades) {
      onSaveGrades(editedGrades);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGrades(assignment.grades || {});
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 max-h-[90vh] overflow-y-auto w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-sky-900">
              {assignment.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {assignment.course} - {assignment.chapter}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && onSaveGrades && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 text-sm text-[#0B609D] hover:bg-[#EEF3FD] rounded-lg transition flex items-center gap-2"
              >
                <Edit2 size={16} />
                Edit Grades
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-4" style={{ backgroundColor: "#EEF3FD" }}>
            <div className="text-xs text-gray-600 mb-1">Average</div>
            <div className="text-2xl font-bold" style={{ color: "#0B609D" }}>
              {stats.average.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">
              {((stats.average / assignment.maxScore) * 100).toFixed(0)}%
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-1">Highest</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.highest}
            </div>
            <div className="text-xs text-gray-500">
              {((stats.highest / assignment.maxScore) * 100).toFixed(0)}%
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-1">Lowest</div>
            <div className="text-2xl font-bold text-red-600">
              {stats.lowest}
            </div>
            <div className="text-xs text-gray-500">
              {((stats.lowest / assignment.maxScore) * 100).toFixed(0)}%
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ backgroundColor: "#EEF3FD" }}>
            <div className="text-xs text-gray-600 mb-1">Pass Rate</div>
            <div className="text-2xl font-bold" style={{ color: "#0B609D" }}>
              {stats.passRate.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500">
              ≥50% score
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Award size={16} />
            Student Grades
          </h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map(student => {
              const grade = isEditing ? editedGrades[student.id] : assignment.grades?.[student.id];
              const hasGrade = grade !== undefined;
              
              return (
                <div
                  key={student.id}
                  className={`flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-lg border ${
                    hasGrade ? "border-gray-200" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: "#0B609D" }}>
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-gray-700 font-medium">{student.name}</span>
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="number"
                      min={0}
                      max={assignment.maxScore}
                      value={editedGrades[student.id] ?? ""}
                      placeholder={`Max ${assignment.maxScore}`}
                      onChange={e => handleGradeChange(student.id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center"
                    />
                  ) : hasGrade ? (
                    <div className="flex items-center gap-3">
                      {getPerformanceIcon(grade)}
                      <div className={`px-3 py-1 rounded-full font-semibold ${getGradeColor(grade)}`}>
                        {grade} / {assignment.maxScore}
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">
                        {((grade / assignment.maxScore) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm italic">Not graded</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white rounded-full transition flex items-center gap-2"
                style={{ background: "linear-gradient(to right, #0B609D, #6b7280)" }}
              >
                <Save size={16} />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 text-white rounded-full transition"
              style={{ background: "linear-gradient(to right, #0B609D, #6b7280)" }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
