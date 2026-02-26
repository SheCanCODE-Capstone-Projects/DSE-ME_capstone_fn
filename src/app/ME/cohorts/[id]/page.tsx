"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, Users, BookOpen, UserCircle } from "lucide-react";
import { useGetMeCohortsList } from "@/hooks/me/useMeCohorts";
import AddCohortModal from "@/components/ME/Participant/AddCohortModal";
import ManageFacilitatorsModal from "@/components/ME/Cohort/ManageFacilitatorsModal";

export default function CohortBatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.id as string;
  
  const [addTrackOpen, setAddTrackOpen] = useState(false);
  const [manageFacilitators, setManageFacilitators] = useState<{ id: string; name: string } | null>(null);

  const { data: allCohorts = [], isLoading } = useGetMeCohortsList();
  
  const tracks = allCohorts.filter((c: any) => c.batchId === batchId);
  const batchName = tracks[0]?.batch?.name || tracks[0]?.name || "Cohort Batch";

  const facilitatorNames = (facilitators?: any[]) => {
    if (!facilitators || facilitators.length === 0) return "No facilitators assigned";
    return facilitators.map(f => [f.firstName, f.lastName].filter(Boolean).join(" ")).join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{batchName}</h1>
          <p className="text-sm text-slate-500">Manage tracks and facilitators for this cohort</p>
        </div>
        <button
          onClick={() => setAddTrackOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B609D] text-white text-sm font-semibold hover:bg-[#094d7a] transition"
        >
          <Plus size={16} />
          Add Track
        </button>
      </div>

      {isLoading && <p className="text-sm text-slate-500">Loading tracks...</p>}

      {!isLoading && tracks.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-500 mb-4">No tracks created yet for this cohort.</p>
          <button
            onClick={() => setAddTrackOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B609D] text-white text-sm font-semibold hover:bg-[#094d7a] transition"
          >
            <Plus size={16} />
            Create First Track
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tracks.map((track: any) => (
          <div
            key={track.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900 text-lg">{track.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                track.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                track.status === 'UPCOMING' ? 'bg-blue-50 text-blue-700' :
                'bg-slate-50 text-slate-600'
              }`}>
                {track.status || 'PLANNED'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <BookOpen size={16} />
                <span>{track.course?.name || "No course assigned"}</span>
              </div>

              <div className="flex items-start gap-2 text-sm text-slate-600">
                <UserCircle size={16} className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 mb-1">Facilitators:</p>
                  <p className="font-medium">{facilitatorNames(track.facilitators)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} />
                <span>{track.currentParticipants || 0} / {track.maxParticipants || 30} participants</span>
              </div>
            </div>

            <button
              onClick={() => setManageFacilitators({ id: track.id, name: track.name })}
              className="w-full px-4 py-2 rounded-lg border border-[#0B609D] text-[#0B609D] hover:bg-[#0B609D] hover:text-white transition text-sm font-medium"
            >
              Manage Facilitators
            </button>
          </div>
        ))}
      </div>

      <AddCohortModal
        isOpen={addTrackOpen}
        onClose={() => setAddTrackOpen(false)}
        onCreate={() => setAddTrackOpen(false)}
      />

      {manageFacilitators && (
        <ManageFacilitatorsModal
          cohortId={manageFacilitators.id}
          cohortName={manageFacilitators.name}
          isOpen={!!manageFacilitators}
          onClose={() => setManageFacilitators(null)}
        />
      )}
    </div>
  );
}
