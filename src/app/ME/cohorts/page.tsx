"use client";

import { useMemo, useState } from "react";
import { Calendar, MapPin, Users, Plus, Hash, MoreVertical, ChevronRight } from "lucide-react";
import { useGetMeCohortBatchesList, useGetMeCohortsList, useUpdateCohortBatchStatus } from "@/hooks/me/useMeCohorts";
import AddCohortBatchModal from "@/components/ME/Participant/AddCohortBatchModal";
import { useRouter } from "next/navigation";

type CohortStatus = 'PLANNED' | 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

const STATUS_OPTIONS: { value: CohortStatus; label: string; color: string }[] = [
  { value: 'PLANNED', label: 'Planned', color: 'bg-slate-50 text-slate-600' },
  { value: 'UPCOMING', label: 'Upcoming', color: 'bg-blue-50 text-blue-700' },
  { value: 'ACTIVE', label: 'Active', color: 'bg-green-50 text-green-700' },
  { value: 'COMPLETED', label: 'Completed', color: 'bg-gray-50 text-gray-600' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-50 text-red-700' },
];

export default function CohortsPage() {
  const router = useRouter();
  const { data: batches = [], isLoading } = useGetMeCohortBatchesList();
  const { data: allCohorts = [] } = useGetMeCohortsList();
  const [addOpen, setAddOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const updateStatus = useUpdateCohortBatchStatus();

  const sorted = useMemo(
    () =>
      [...batches].sort((a, b) =>
        (b.startDate || "").localeCompare(a.startDate || "")
      ),
    [batches]
  );

  const getTracksForBatch = (batchId: string) => {
    return allCohorts.filter((c: any) => c.batchId === batchId);
  };

  const handleStatusChange = async (cohortId: string, newStatus: CohortStatus) => {
    try {
      await updateStatus.mutateAsync({ id: cohortId, status: newStatus });
      setMenuOpen(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status.toUpperCase());
    return option?.color || 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Cohorts</h1>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
              <Hash size={12} />
              {sorted.length} {sorted.length === 1 ? "cohort" : "cohorts"}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            This is your cohort space – each cohort is an intake/batch (e.g. “She
            Can Code 2024 Cohort”). Inside a cohort, participants can later be
            grouped into different courses and facilitators.
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B609D] text-white text-sm font-semibold hover:bg-[#094d7a] transition"
        >
          <Plus size={16} />
          Register Cohort
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500">Loading cohorts…</p>
      )}

      {!isLoading && sorted.length === 0 && (
        <p className="text-sm text-slate-500">
          No cohorts registered yet. Click “Register Cohort” to create your first
          intake.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map((c) => {
          const tracks = getTracksForBatch(c.id);
          const totalParticipants = tracks.reduce((sum: number, t: any) => sum + (t.currentParticipants || 0), 0);
          
          return (
            <div
              key={c.id}
              onClick={() => router.push(`/ME/cohorts/${c.id}`)}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 relative cursor-pointer hover:shadow-md hover:border-[#0B609D] transition"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{c.name}</h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      getStatusColor(c.status || 'PLANNED')
                    }`}
                  >
                    {STATUS_OPTIONS.find(opt => opt.value === (c.status || 'PLANNED').toUpperCase())?.label || c.status}
                  </span>
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}
                      className="p-1 hover:bg-slate-100 rounded transition"
                    >
                      <MoreVertical size={16} className="text-slate-500" />
                    </button>
                    {menuOpen === c.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setMenuOpen(null)}
                        />
                        <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                          <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase">Change Status</div>
                          {STATUS_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleStatusChange(c.id, option.value)}
                              disabled={updateStatus.isPending}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition flex items-center gap-2 disabled:opacity-50"
                            >
                              <span className={`w-2 h-2 rounded-full ${option.color.split(' ')[0]}`} />
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={14} />
                <span>
                  {c.startDate} {c.endDate ? `– ${c.endDate}` : ""}
                </span>
              </div>

              {c.centerName && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={14} />
                  <span>{c.centerName}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-600 mt-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{totalParticipants} participants</span>
                  <ChevronRight size={14} className="text-[#0B609D]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddCohortBatchModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

