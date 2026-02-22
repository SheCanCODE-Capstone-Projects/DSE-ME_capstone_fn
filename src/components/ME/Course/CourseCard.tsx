"use client";

import { BookOpen, Users, UserCog, Clock, Edit2, Trash2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  facilitatorsCount: number;
  participantsCount: number;
  isActive: boolean;
}

interface CourseCardProps {
  course: Course;
  onToggleActive: (id: string) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export default function CourseCard({ course, onToggleActive, onEdit, onDelete }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    const upperLevel = level.toUpperCase();
    switch (upperLevel) {
      case "BEGINNER": return "bg-green-100 text-green-800";
      case "INTERMEDIATE": return "bg-yellow-100 text-yellow-800";
      case "ADVANCED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden transition-opacity duration-200 ${
      !course.isActive ? "opacity-60" : "opacity-100"
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{course.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{course.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {formatLevel(course.level)}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {course.duration} weeks
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(course)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Edit course"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete course"
            >
              <Trash2 size={16} />
            </button>
            <span
              onClick={() => onToggleActive(course.id)}
              className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
                course.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
              title={course.isActive ? "Active" : "Inactive"}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-all ${
                  course.isActive ? "ml-auto" : "ml-0"
                }`}
              />
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-4" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <UserCog size={16} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{course.facilitatorsCount}</p>
              <p className="text-xs text-gray-500">Facilitators</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{course.participantsCount}</p>
              <p className="text-xs text-gray-500">Participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
