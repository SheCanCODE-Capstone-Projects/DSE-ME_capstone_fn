"use client";

import { useFacilitatorCohorts } from "@/hooks/useFacilitator";
import { BookOpen, Users, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyCohortsPage() {
  const { data: cohorts = [], isLoading } = useFacilitatorCohorts();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'UPCOMING': return 'bg-blue-100 text-blue-700';
      case 'COMPLETED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#34597E]">My Cohorts</h1>
        <p className="text-sm text-gray-500 mt-1">View all cohorts and tracks assigned to you</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading cohorts...</p>
        </div>
      ) : cohorts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cohorts Assigned</h3>
          <p className="text-gray-500">Contact your ME Officer to get assigned to cohorts</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohorts.map((cohort) => (
            <div
              key={cohort.cohortId}
              onClick={() => router.push(`/facilitator/participants?cohort=${cohort.cohortId}`)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{cohort.cohortName}</h3>
                  <p className="text-sm text-gray-600">{cohort.courseName}</p>
                  {cohort.courseCode && (
                    <p className="text-xs text-gray-500 mt-1">{cohort.courseCode}</p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(cohort.status)}`}>
                  {cohort.status}
                </span>
              </div>

              {cohort.batchName && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Calendar size={16} />
                  <span>{cohort.batchName}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-gray-400" />
                  <span className="font-semibold text-[#0B609D]">{cohort.activeParticipants}</span>
                  <span className="text-gray-500">/ {cohort.totalParticipants} participants</span>
                </div>
              </div>

              {cohort.startDate && (
                <div className="mt-3 text-xs text-gray-500">
                  Starts: {new Date(cohort.startDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
