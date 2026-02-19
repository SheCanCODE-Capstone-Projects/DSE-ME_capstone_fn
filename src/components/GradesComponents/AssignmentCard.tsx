import React from "react";
import { Pencil, Trash, BookOpen, Calendar, Award, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface AssignmentCardProps {
  title: string;
  type: string; 
  chapter: string;
  course: string;
  dueDate: string;
  maxScore: number;
  description?: string;
  status?: "not-started" | "in-progress" | "completed";
  totalStudents?: number;
  gradedStudents?: number;
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
  status = "not-started",
  totalStudents = 0,
  gradedStudents = 0,
  onGradeClick,
  onEditClick,
  onDeleteClick,
}: AssignmentCardProps) {
  
 
  const getStatusStyles = () => {
    switch (status) {
      case "completed":
        return {
          card: "bg-white border-2 border-green-200",
          badge: "bg-green-100 text-green-700",
          icon: <CheckCircle className="text-green-500" size={16} />,
          button: "bg-gray-600 hover:bg-gray-700 text-white",
          buttonText: "View Grades"
        };
      case "in-progress":
        return {
          card: "bg-white border-2 border-yellow-200",
          badge: "bg-yellow-100 text-yellow-700",
          icon: <Clock className="text-yellow-500" size={16} />,
          button: "bg-sky-600 hover:bg-sky-700 text-white",
          buttonText: "Continue Grading"
        };
      default:
        return {
          card: "bg-white border-2 border-red-200",
          badge: "bg-red-100 text-red-700",
          icon: <AlertCircle className="text-red-500" size={16} />,
          button: "bg-sky-700 hover:bg-sky-800 text-white",
          buttonText: "Start Grading"
        };
    }
  };

  const statusStyles = getStatusStyles();
  return (
    <div className={`rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition ${statusStyles.card}`}>
     
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-sky-700 mb-2">{title}</h3>
          <div className="flex items-center gap-2">
            {statusStyles.icon}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles.badge}`}>
              {status === "not-started" ? "Not Started" : 
               status === "in-progress" ? "In Progress" : "Completed"}
            </span>
            {totalStudents > 0 && (
              <span className="text-xs text-gray-500">
                ({gradedStudents}/{totalStudents} graded)
              </span>
            )}
          </div>
        </div>
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
        className={`py-2 rounded-full font-semibold transition ${statusStyles.button}`}
      >
        {statusStyles.buttonText}
      </button>
    </div>
  );
}
