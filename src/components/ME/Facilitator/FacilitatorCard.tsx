
"use client";

import { User, Users, BookOpen, Plus, X } from "lucide-react";
import { Facilitator } from "@/types/facilitator";

interface FacilitatorCardProps {
  facilitator: Facilitator;
  onAssignCohort?: () => void;
  onAssignCourse?: () => void;
  onToggleActive?: (id: string) => void; 
}

export default function FacilitatorCard({
  facilitator,
  onAssignCohort,
  onAssignCourse,
  onToggleActive,
}: FacilitatorCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden transition-opacity duration-200 ${
        !facilitator.isActive ? "opacity-60" : "opacity-100"
      }`}
    >
      
      <div className="p-6 flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
            <User size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{facilitator.name}</h3>
            <p className="text-sm text-gray-500">{facilitator.email}</p>
            <p className="text-sm text-gray-600 mt-1">
              {facilitator.region} · {facilitator.participantsCount} Participants
            </p>
          </div>
        </div>

       
        <span
          onClick={() => onToggleActive?.(facilitator.id)}
          className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
            facilitator.isActive ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full transition-all ${
              facilitator.isActive ? "ml-auto" : "ml-0"
            }`}
          />
        </span>
      </div>

      
      <div className="border-t border-gray-200 mx-4" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-medium text-gray-900">
            <Users size={18} />
            Assigned Cohorts
          </div>
          <span className="text-sm bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">
            {facilitator.cohorts.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {facilitator.cohorts.map((cohort) => (
            <span
              key={cohort.id}
              className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {cohort.name} <X size={12} />
            </span>
          ))}
        </div>

        <button
          onClick={onAssignCohort}
          disabled={!facilitator.isActive}
          className={`text-sm px-2 py-1 rounded-md w-full md:w-auto hover:underline transition-colors flex items-center gap-1 ${
            facilitator.isActive
              ? "text-sky-600 hover:bg-sky-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <Plus size={14} /> Assign Cohort
        </button>
      </div>

      <div className="border-t border-gray-200 mx-4" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-medium text-gray-900">
            <BookOpen size={18} />
            Tracks
          </div>
          <span className="text-sm bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">
            {facilitator.courses.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {facilitator.courses.map((course) => (
            <span
              key={course.id}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {course.name} <X size={12} />
            </span>
          ))}
        </div>

        <button
          onClick={onAssignCourse}
          disabled={!facilitator.isActive}
          className={`text-sm px-2 py-1 rounded-md w-full md:w-auto hover:underline transition-colors flex items-center gap-1 ${
            facilitator.isActive
              ? "text-sky-600 hover:bg-sky-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <Plus size={14} /> Assign Track
        </button>
      </div>
    </div>
  );
}
