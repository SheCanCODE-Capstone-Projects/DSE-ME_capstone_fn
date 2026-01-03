"use client";
import React from "react";
import { Pencil, Trash, BookOpen, Calendar, Award, FileText } from "lucide-react";

interface AssignmentCardProps {
  title: string;
  type: string; 
  chapter: string;
  course: string;
  dueDate: string;
  maxScore: number;
  description?: string; 
  onGradeClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export default function AssignmentCard({
  title,
  type,
  chapter,
  course,
  dueDate,
  maxScore,
  description,
  onGradeClick,
  onEditClick,
  onDeleteClick,
}: AssignmentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
      
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-sky-700">{title}</h3>
        <div className="flex gap-2">
          <button onClick={onEditClick} className="text-gray-600 hover:text-sky-700 transition">
            <Pencil size={16} />
          </button>
          <button onClick={onDeleteClick} className="text-red-500 hover:text-red-700 transition">
            <Trash size={16} />
          </button>
        </div>
      </div>

    
      <span
        className={`px-2 w-20 py-1 rounded-full text-xs font-medium mb-3 ${
          type === "Capstone" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
        }`}
      >
        {type}
      </span>
<div className="flex flex-col  gap-2 mb-4 text-sky-700 text-sm font-medium bg-sky-50 px-6 py-2 rounded-xl" style={{ backgroundColor: "#EEF3FD" }}>
  <div className="flex items-center gap-1">
    <BookOpen size={14} />
    <span>{course}</span>
  </div>
    <div className="text-gray-600 text-xs">chapter: {chapter}</div>
 
</div>


      
      <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>Due: {dueDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Award size={14} />
          <span>Max Score: {maxScore}</span>
        </div>
      </div>

      
      {description && (
        <p className="text-gray-700 text-sm mb-4">
          {description}
        </p>
      )}

      
      <button
        onClick={onGradeClick}
        className="bg-sky-700 text-white py-2 rounded-full font-semibold hover:bg-sky-800 transition"
      >
        Grade Students
      </button>
    </div>
  );
}
