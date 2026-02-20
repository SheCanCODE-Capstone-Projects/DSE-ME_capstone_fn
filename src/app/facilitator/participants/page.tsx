
"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Download, Plus, Search, User, UserCheck, UserX, Users } from "lucide-react";
import StatusCard from "../../../components/ui/statuscard";
import {
  useCreateFacilitatorParticipant,
  useFacilitatorParticipantById,
  useFacilitatorParticipantDetail,
  useFacilitatorParticipantStatistics,
  useFacilitatorParticipantsList,
  useUpdateFacilitatorParticipant,
} from "@/hooks/participants/useParticipants";
import type {
  CreateFacilitatorParticipantDTO,
  DisabilityStatus,
  EmploymentStatusBaseline,
  EnrollmentStatus,
  Gender,
  UpdateFacilitatorParticipantDTO,
} from "@/types/facilitatorParticipants";


type StatusFilter = "All" | EnrollmentStatus;
type GenderFilter = "All" | Gender;


const GENDER_OPTIONS: Gender[] = ["FEMALE", "MALE", "NON_BINARY", "PREFER_NOT_TO_SAY"];
const DISABILITY_OPTIONS: DisabilityStatus[] = ["NO", "YES", "PREFER_NOT_TO_SAY"];
const EMPLOYMENT_OPTIONS: EmploymentStatusBaseline[] = [
  "EMPLOYED",
  "UNEMPLOYED",
  "SELF_EMPLOYED",
  "FURTHER_EDUCATION",
];

function ParticipantModal({
  mode,
  onClose,
  onCreate,
  onUpdate,
  initialData,
  title,
  isSaving,
}: {
  mode: "create" | "edit";
  onClose: () => void;
  onCreate: (data: CreateFacilitatorParticipantDTO) => Promise<void>;
  onUpdate: (data: UpdateFacilitatorParticipantDTO) => Promise<void>;
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string | null;
    gender: Gender;
    disabilityStatus: DisabilityStatus;
    educationLevel: string;
    employmentStatusBaseline: EmploymentStatusBaseline;
  } | null;
  title: string;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: (initialData?.gender || "FEMALE") as Gender,
    disabilityStatus: (initialData?.disabilityStatus || "NO") as DisabilityStatus,
    educationLevel: initialData?.educationLevel || "",
    employmentStatusBaseline: (initialData?.employmentStatusBaseline || "UNEMPLOYED") as EmploymentStatusBaseline,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }

    try {
      if (mode === "create") {
        if (!formData.email.trim() || !formData.phone.trim() || !formData.educationLevel.trim()) {
          toast.error("Email, phone, and education level are required.");
          return;
        }

        await onCreate({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
          gender: formData.gender,
          disabilityStatus: formData.disabilityStatus,
          educationLevel: formData.educationLevel.trim(),
          employmentStatusBaseline: formData.employmentStatusBaseline,
        });
      } else {
        await onUpdate({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
          gender: formData.gender,
          disabilityStatus: formData.disabilityStatus,
        });
      }

      onClose();
    } catch (err) {
      toast.error((err as Error).message || "Failed to save participant.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl leading-none" aria-label="Close">
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {mode === "create" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  name="phone"
                  type="text"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Disability Status</label>
              <select
                name="disabilityStatus"
                value={formData.disabilityStatus}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
              >
                {DISABILITY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mode === "create" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Education Level</label>
                <input
                  name="educationLevel"
                  type="text"
                  required
                  value={formData.educationLevel}
                  onChange={handleChange}
                  placeholder="e.g. Secondary, Bachelor, etc."
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Baseline</label>
                <select
                  name="employmentStatusBaseline"
                  value={formData.employmentStatusBaseline}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
                >
                  {EMPLOYMENT_OPTIONS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full px-6 py-2.5 bg-[#0B609D] hover:bg-[#094d7a] disabled:opacity-60 text-white rounded-lg transition-colors font-medium"
            >
              {isSaving ? "Saving..." : mode === "create" ? "Add Participant" : "Update Participant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function ViewParticipantModal({
  detail,
  isLoading,
  error,
  onClose,
}: {
  detail: {
    participantId: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    gender: Gender | null;
    disabilityStatus: DisabilityStatus | null;
    cohortName: string | null;
    enrollmentStatus: string | null;
    attendancePercentage: number | null;
  } | null;
  isLoading: boolean;
  error: Error | null;
  onClose: () => void;
}) {
  if (!detail && !isLoading && !error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Participant Details</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl leading-none" aria-label="Close">
            &times;
          </button>
        </div>

        {isLoading ? (
          <div className="py-8 text-sm text-gray-600">Loading participant details…</div>
        ) : error ? (
          <div className="py-8 text-sm text-red-700">{error.message || "Failed to load participant details."}</div>
        ) : detail ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">ID:</span> {detail.participantId}
            </p>
            <p>
              <span className="font-medium">Name:</span> {[detail.firstName, detail.lastName].filter(Boolean).join(" ")}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {detail.gender || "-"}
            </p>
            <p>
              <span className="font-medium">Disability Status:</span> {detail.disabilityStatus || "-"}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {detail.phone || "-"}
            </p>
            <p>
              <span className="font-medium">Email:</span> {detail.email || "-"}
            </p>
            <p>
              <span className="font-medium">Cohort:</span> {detail.cohortName || "-"}
            </p>
            <p>
              <span className="font-medium">Attendance:</span>{" "}
              {detail.attendancePercentage === null || detail.attendancePercentage === undefined
                ? "-"
                : `${detail.attendancePercentage}%`}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                {detail.enrollmentStatus || "-"}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}


const ParticipantsTable = ({ 
  participants, 
  onView,
  onEdit
}: { 
  participants: {
    participantId: string;
    firstName: string | null;
    lastName: string | null;
    gender: Gender | null;
    email: string | null;
    phone: string | null;
    enrollmentDate: string | null;
    attendancePercentage: number | null;
    enrollmentStatus: string | null;
  }[], 
  onView: (participantId: string) => void,
  onEdit: (participantId: string) => void
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
      <table className="min-w-[800px] w-full text-sm">
        <thead className="bg-[#eef3fb] text-[#1e3a8a]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Enrollment Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Attendance</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-10 text-center text-gray-500 italic">
                No participants found matching your criteria.
              </td>
            </tr>
          ) : (
            participants.map((participant) => (
              <tr key={participant.participantId}>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.participantId.slice(0, 8)}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap font-medium">
                  {[participant.firstName, participant.lastName].filter(Boolean).join(" ")}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.gender || "-"}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.email || "-"}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.phone || "-"}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.enrollmentDate || "-"}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {participant.attendancePercentage === null || participant.attendancePercentage === undefined
                    ? "-"
                    : `${participant.attendancePercentage}%`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      participant.enrollmentStatus === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : participant.enrollmentStatus === "INACTIVE"
                        ? "bg-red-100 text-red-800"
                        : participant.enrollmentStatus === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {participant.enrollmentStatus || "-"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => onView(participant.participantId)}
                    className="px-3 py-1.5 bg-[#0B609D] hover:bg-[#094d7a] text-white text-xs rounded-lg transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(participant.participantId)}
                    className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export default function Participant() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);
  

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const participantsQuery = useFacilitatorParticipantsList({
    page,
    size: pageSize,
    search: searchQuery,
    enrollmentStatusFilter: statusFilter === "All" ? undefined : statusFilter,
    genderFilter: genderFilter === "All" ? undefined : genderFilter,
    sortBy: "firstName",
    sortDirection: "ASC",
  });

  const statsQuery = useFacilitatorParticipantStatistics();
  const createMutation = useCreateFacilitatorParticipant();
  const updateMutation = useUpdateFacilitatorParticipant();

  const editParticipantQuery = useFacilitatorParticipantById(editOpen ? selectedParticipantId : null);
  const viewDetailQuery = useFacilitatorParticipantDetail(viewOpen ? selectedParticipantId : null, viewOpen);

  const participants = participantsQuery.data?.participants ?? [];

  const stats = useMemo(() => {
    const s = statsQuery.data;
    const genderDist = s?.genderDistribution || {};

    return [
      { title: "Total", value: s?.totalParticipantsCount ?? 0, icon: <Users size={28} />, subtext: "Participants" },
      { title: "Active", value: s?.activeParticipantsCount ?? 0, icon: <UserCheck size={28} />, subtext: "Members" },
      { title: "Inactive", value: s?.inactiveParticipantsCount ?? 0, icon: <UserX size={28} />, subtext: "Members" },
      { title: "Female", value: genderDist["FEMALE"] ?? 0, icon: <User size={28} />, subtext: "Participants" },
    ];
  }, [statsQuery.data]);

  const handleView = (participantId: string) => {
    setSelectedParticipantId(participantId);
    setViewOpen(true);
  };

  const handleEdit = (participantId: string) => {
    setSelectedParticipantId(participantId);
    setEditOpen(true);
  };

  const handleExport = () => {
    const header = "Participant ID,First Name,Last Name,Gender,Email,Phone,Enrollment Date,Attendance %,Status\n";
    const csvData = participants
      .map((p) =>
        [
          p.participantId,
          `"${p.firstName || ""}"`,
          `"${p.lastName || ""}"`,
          p.gender || "",
          `"${p.email || ""}"`,
          `"${p.phone || ""}"`,
          p.enrollmentDate || "",
          p.attendancePercentage ?? "",
          p.enrollmentStatus || "",
        ].join(",")
      )
      .join("\n");

    const blob = new Blob([header + csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `participants_export_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className=" mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Participants Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and track all participants in your cohort.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 text-sm text-white rounded-lg bg-[#0B609D] hover:bg-[#094d7a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Participant
        </button>
      </div>

      {open && (
        <ParticipantModal
          mode="create"
          title="Add Participant"
          initialData={null}
          isSaving={createMutation.isPending}
          onClose={() => setOpen(false)}
          onCreate={async (dto) => {
            await createMutation.mutateAsync(dto);
            toast.success("Participant created successfully.");
          }}
          onUpdate={async () => {}}
        />
      )}
      {editOpen && (
        editParticipantQuery.isLoading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-gray-700">Loading participant…</div>
            </div>
          </div>
        ) : editParticipantQuery.error ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-red-700">
                {(editParticipantQuery.error as Error).message || "Failed to load participant."}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 text-sm text-white rounded-lg bg-[#0B609D] hover:bg-[#094d7a] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ParticipantModal
            mode="edit"
            title="Update Participant Details"
            initialData={editParticipantQuery.data || null}
            isSaving={updateMutation.isPending}
            onClose={() => {
              setEditOpen(false);
            }}
            onCreate={async () => {}}
            onUpdate={async (dto) => {
              if (!selectedParticipantId) return;
              await updateMutation.mutateAsync({ participantId: selectedParticipantId, dto });
              toast.success("Participant updated successfully.");
            }}
          />
        )
      )}  
      {viewOpen && (
        <ViewParticipantModal
          detail={viewDetailQuery.data ?? null}
          isLoading={viewDetailQuery.isLoading}
          error={(viewDetailQuery.error as Error) ?? null}
          onClose={() => setViewOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            subtext={stat.subtext}
          />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col xl:flex-row items-center justify-between gap-4 border border-gray-100">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-lg font-bold text-gray-700 hidden sm:block whitespace-nowrap">Search</label>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Name, email, or phone..."
              className="pl-10 pr-4 py-2 border w-full rounded-full focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select 
            className="px-4 py-2 border rounded-full bg-white text-sm outline-none cursor-pointer"
            value={genderFilter}
            onChange={(e) => {
              setGenderFilter(e.target.value as GenderFilter);
              setPage(0);
            }}
          >
            <option value="All">All Genders</option>
            <option value="FEMALE">FEMALE</option>
            <option value="MALE">MALE</option>
            <option value="NON_BINARY">NON_BINARY</option>
            <option value="PREFER_NOT_TO_SAY">PREFER_NOT_TO_SAY</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-full bg-white text-sm outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusFilter);
              setPage(0);
            }}
          >
            <option value="All">All Status</option>
            <option value="ENROLLED">ENROLLED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="DROPPED_OUT">DROPPED_OUT</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
          </select>

          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm text-white rounded-lg bg-[#0B609D] hover:bg-[#094d7a] transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100">
        {participantsQuery.isLoading ? (
          <div className="p-6 text-sm text-gray-600">Loading participants…</div>
        ) : participantsQuery.error ? (
          <div className="p-6 text-sm text-red-700">
            {(participantsQuery.error as Error).message || "Failed to load participants."}
          </div>
        ) : (
          <ParticipantsTable participants={participants} onView={handleView} onEdit={handleEdit} />
        )}
      </div>

      {participantsQuery.data && participantsQuery.data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {participantsQuery.data.currentPage + 1} of {participantsQuery.data.totalPages} •{" "}
            {participantsQuery.data.totalElements} total
          </div>
          <div className="flex gap-2">
            <button
              disabled={!participantsQuery.data.hasPrevious}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-3 py-2 text-sm rounded-lg border disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled={!participantsQuery.data.hasNext}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 text-sm rounded-lg border disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
