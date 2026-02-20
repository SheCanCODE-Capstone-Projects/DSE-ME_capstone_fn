"use client";

import { useMemo } from "react";
import { Calendar, MapPin, Users, Plus, Hash } from "lucide-react";
import { useGetMeCohortBatchesList } from "@/hooks/me/useMeCohorts";
import AddCohortBatchModal from "@/components/ME/Participant/AddCohortBatchModal";
import { useState } from "react";

export default function CohortsPage() {
  const { data: batches = [], isLoading } = useGetMeCohortBatchesList();
  const [addOpen, setAddOpen] = useState(false);

  const sorted = useMemo(
    () =>
      [...batches].sort((a, b) =>
        (b.startDate || "").localeCompare(a.startDate || "")
      ),
    [batches]
  );

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
        {sorted.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">{c.name}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  (c.status || "").toLowerCase() === "active"
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-50 text-slate-600"
                }`}
              >
                {c.status || "PLANNED"}
              </span>
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

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Users size={14} />
              <span>Tracks & participants will appear here once configured.</span>
            </div>
          </div>
        ))}
      </div>

      <AddCohortBatchModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

