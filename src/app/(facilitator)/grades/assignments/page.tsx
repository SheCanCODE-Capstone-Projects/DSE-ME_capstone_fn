"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AssignmentCard from "@/components/GradesComponents/AssignmentCard";
import CreateAssignmentModal from "@/components/GradesComponents/CreateAssignmentModal";
import GradeStudentsModal from "@/components/GradesComponents/GradeStudentsModal";
import { Assignment } from "@/types/assignment";

export default function AssignmentsPage() {
  const router = useRouter();

  
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

 
  const [openGrade, setOpenGrade] = useState(false);
  const [gradeIndex, setGradeIndex] = useState<number | null>(null);

  
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      title: "HTML Structure Assignment",
      type: "Assignment",
      course: "Web Fundamentals",
      chapter: "HTML Basics",
      dueDate: "2025-01-20",
      maxScore: 100,
    },
    {
      title: "Final Portfolio Project",
      type: "Capstone",
      course: "Web Fundamentals",
      chapter: "Responsive Design",
      dueDate: "2025-01-25",
      maxScore: 200,
    },
  ]);

  
  const addAssignment = (newAssignment: Assignment) => {
    setAssignments(prev => [...prev, newAssignment]);
    setOpenCreate(false);
  };

 
  const updateAssignment = (updated: Assignment) => {
    if (editIndex === null) return;
    const newList = [...assignments];
    newList[editIndex] = updated;
    setAssignments(newList);
    setOpenEdit(false);
    setEditIndex(null);
  };


  const deleteAssignment = (index: number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      const newList = [...assignments];
      newList.splice(index, 1);
      setAssignments(newList);
    }
  };


  const saveGrades = (grades: Record<string, number>) => {
    if (gradeIndex === null) return;
    const newList = [...assignments];
    newList[gradeIndex] = { ...newList[gradeIndex], grades };
    setAssignments(newList);
    setOpenGrade(false);
    setGradeIndex(null);
  };

  return (
    <div className="ml-28 pr-6 pb-6 min-h-screen">
    
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-sky-700">Assignments</h1>
          <p className="text-xs text-gray-600">Create, manage, and grade student assignments</p>
        </div>
      </div>

      
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenCreate(true)}
          className="px-4 py-2 text-xs text-white rounded-full bg-gradient-to-r from-sky-600 to-gray-400 hover:from-sky-700 hover:to-gray-500 transition"
        >
          + New Assignment
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((a, idx) => (
          <AssignmentCard
            key={idx}
            {...a}
            onGradeClick={() => {
              setGradeIndex(idx);
              setOpenGrade(true);
            }}
            onEditClick={() => {
              setEditIndex(idx);
              setOpenEdit(true);
            }}
            onDeleteClick={() => deleteAssignment(idx)}
          />
        ))}
      </div>

      
      <CreateAssignmentModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={addAssignment}
      />

      
      {editIndex !== null && (
        <CreateAssignmentModal
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onCreate={updateAssignment}
          assignment={assignments[editIndex]}
        />
      )}

     
      {gradeIndex !== null && (
        <GradeStudentsModal
          isOpen={openGrade}
          onClose={() => setOpenGrade(false)}
          assignment={assignments[gradeIndex]}
          onSaveGrades={saveGrades}
        />
      )}
    </div>
  );
}
