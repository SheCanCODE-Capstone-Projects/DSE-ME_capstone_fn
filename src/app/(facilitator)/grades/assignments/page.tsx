"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AssignmentCard from "@/components/GradesComponents/AssignmentCard";
import CreateAssignmentModal from "@/components/GradesComponents/CreateAssignmentModal";

export default function AssignmentsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const assignments = [
    {
      title: "HTML Structure Assignment",
      type: "Assignment",
      course: "Web Fundamentals",
      chapter: "HTML Basics",
      dueDate: "20/01/2025",
      maxScore: 100,
    },
    {
      title: "Final Portfolio Project",
      type: "Capstone",
      course: "Web Fundamentals",
      chapter: "Responsive Design",
      dueDate: "25/01/2025",
      maxScore: 200,
    },
  ];

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
          <h1 className="text-xl font-bold text-sky-700">
            Assignments
          </h1>
          <p className="text-xs text-gray-600">
            Create and manage student assignments
          </p>
        </div>
      </div>

     
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="
            px-4 py-2
            text-xs
            text-white
            rounded-full
            bg-gradient-to-r
            from-sky-600
            to-gray-400
            hover:from-sky-700
            hover:to-gray-500
            transition
          "
        >
          + New Assignment
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {assignments.map((a, idx) => (
          <AssignmentCard
            key={idx}
            {...a}
            onGradeClick={() => {}}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
        ))}
      </div>

     
      <CreateAssignmentModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
