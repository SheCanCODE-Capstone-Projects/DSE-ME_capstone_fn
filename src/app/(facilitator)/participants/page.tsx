"use client";

import React, { useState, useMemo } from "react";
import { Plus, Users, UserX, UserCheck, User, Download, Search } from "lucide-react";
import StatusCard from "../../../components/ui/statuscard";
import { mockParticipants, Participant } from "@/lib/mockParticipants";

/* ================= TYPES ================= */
type ParticipantData = Participant;

/* ================= PARTICIPANT MODAL (ADD & EDIT) ================= */
function ParticipantModal({ 
  onClose, 
  onSave,
  initialData,
  title = "Add Participant"
}: { 
  onClose: () => void; 
  onSave: (data: Omit<ParticipantData, 'id' | 'enrollmentDate'>) => void;
  initialData?: ParticipantData;
  title?: string;
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    age: initialData?.age?.toString() || "",
    course: initialData?.course || "",
    gender: initialData?.gender || "Female",
    cohort: initialData?.cohort || "",
    status: initialData?.status || "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    onSave({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: parseInt(formData.age) || 0,
      course: formData.course,
      gender: formData.gender,
      cohort: formData.cohort,
      status: formData.status
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl leading-none">
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phone"
              type="text"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select 
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
            >
              <option value="Web Fundamentals">Web Fundamentals</option>
              <option value="Advanced Front-End Development">Advanced Front-End Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cohort</label>
            <select 
              name="cohort"
              value={formData.cohort}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
            >
              <option value="cohort-1">cohort-1</option>
              <option value="cohort-2">cohort-2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="suspended">suspended</option>
              <option value="dropout">dropout</option>
            </select>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full px-6 py-2.5 bg-[#0B609D] hover:bg-[#094d7a] text-white rounded-lg transition-colors font-medium"
            >
              {initialData ? "Update Participant" : "Add Participant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= VIEW PARTICIPANT MODAL ================= */
function ViewParticipantModal({
  participant,
  onClose,
}: {
  participant: ParticipantData | null;
  onClose: () => void;
}) {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Participant Details</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <p><span className="font-medium">ID:</span> {participant.id}</p>
          <p><span className="font-medium">Name:</span> {participant.name}</p>
          <p><span className="font-medium">Gender:</span> {participant.gender}</p>
          <p><span className="font-medium">Age:</span> {participant.age}</p>
          <p><span className="font-medium">Phone:</span> {participant.phone}</p>
          <p><span className="font-medium">Email:</span> {participant.email || "example@email.com"}</p>
          <p><span className="font-medium">Course:</span> {participant.course}</p>
          <p><span className="font-medium">Enrollment Date:</span> {participant.enrollmentDate}</p>
          <p><span className="font-medium">Cohort:</span> {participant.cohort}</p>
          
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                participant.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : participant.status === "Inactive" 
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {participant.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= TABLE COMPONENT ================= */
const ParticipantsTable = ({ 
  participants, 
  onView,
  onEdit
}: { 
  participants: ParticipantData[], 
  onView: (p: ParticipantData) => void,
  onEdit: (p: ParticipantData) => void
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
      <table className="min-w-[800px] w-full text-sm">
        <thead className="bg-[#eef3fb] text-[#1e3a8a]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Enrollment Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Course</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Cohort</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-10 text-center text-gray-500 italic">
                No participants found matching your criteria.
              </td>
            </tr>
          ) : (
            participants.map((participant) => (
              <tr key={participant.id}>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.id}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap font-medium">{participant.name}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.gender}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.age}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.phone}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.enrollmentDate}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.course}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{participant.cohort}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      participant.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : participant.status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {participant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => onView(participant)}
                    className="px-3 py-1.5 bg-[#0B609D] hover:bg-[#094d7a] text-white text-xs rounded-lg transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(participant)}
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

/* ================= MAIN PAGE ================= */
export default function Participant() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantData | null>(null);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [cohortFilter, setCohortFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [participants, setParticipants] = useState<ParticipantData[]>([...mockParticipants]);

  // Derived filtered participants
  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.id.includes(searchQuery);
      const matchesGender = genderFilter === "All" || p.gender === genderFilter;
      const matchesCourse = courseFilter === "All" || p.course === courseFilter;
      const matchesCohort = cohortFilter === "All" || p.cohort === cohortFilter;
      const matchesStatus = statusFilter === "All" || p.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesGender && matchesCourse && matchesCohort && matchesStatus;
    });
  }, [participants, searchQuery, genderFilter, courseFilter, cohortFilter, statusFilter]);

  // Stats calculation
  const stats = [
    { title: "Total Active", value: participants.filter(p => p.status === "Active").length, icon: <Users size={28} />, subtext: "Participants" },
    { title: "Inactive", value: participants.filter(p => p.status === "Inactive").length, icon: <UserX size={28} />, subtext: "Members" },
    { title: "Female", value: participants.filter(p => p.gender === "Female").length, icon: <UserCheck size={28} />, subtext: "Students" },
    { title: "Male", value: participants.filter(p => p.gender === "Male").length, icon: <User size={28} />, subtext: "Students" },
  ];

  const handleAddParticipant = (data: Omit<ParticipantData, 'id' | 'enrollmentDate'>) => {
    const nextId = (participants.length + 1).toString().padStart(3, '0');
    const newParticipant: ParticipantData = {
      ...data,
      id: nextId,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
    setParticipants(prev => [...prev, newParticipant]);
  };

  const handleUpdateParticipant = (data: Omit<ParticipantData, 'id' | 'enrollmentDate'>) => {
    if (!selectedParticipant) return;
    setParticipants(prev => prev.map(p => 
      p.id === selectedParticipant.id ? { ...p, ...data } : p
    ));
    setSelectedParticipant(null);
  };

  const handleView = (participant: ParticipantData) => {
    setSelectedParticipant(participant);
    setViewOpen(true);
  };

  const handleEdit = (participant: ParticipantData) => {
    setSelectedParticipant(participant);
    setEditOpen(true);
  };
  const handleExport = () => {
    const header = "ID,Name,Gender,Age,Phone,Enrollment Date,Status\n";
    const csvData = participants.map(p => 
      `${p.id},"${p.name}",${p.gender},${p.age},${p.phone},${p.enrollmentDate},${p.status},${p.cohort}, ${p.course}`
    ).join("\n");
    
    const blob = new Blob([header + csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `participants_export_${new Date().toISOString().split('T')[0]}.csv`);
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
          onClose={() => setOpen(false)} 
          onSave={handleAddParticipant} 
        />
      )}
      {editOpen && (
        <ParticipantModal 
          title="Update Participant Details"
          initialData={selectedParticipant || undefined}
          onClose={() => {
            setEditOpen(false);
            setSelectedParticipant(null);
          }} 
          onSave={handleUpdateParticipant} 
        />
      )}  
      {viewOpen && (
        <ViewParticipantModal
          participant={selectedParticipant}
          onClose={() => setViewOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={<Users size={32} />}
            subtext=""
           
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Names or ID..."
              className="pl-10 pr-4 py-2 border w-full rounded-full focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select 
            className="px-4 py-2 border rounded-full bg-white text-sm outline-none cursor-pointer"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>
            <option value="Web Fundamentals">Web Fundamentals</option>
            <option value="Advanced Front-End Development">Advanced Front-End Development</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-full bg-white text-sm outline-none cursor-pointer"
            value={cohortFilter}
            onChange={(e) => setCohortFilter(e.target.value)}
          >
            <option value="All">All Cohorts</option>
            <option value="cohort-1">cohort-1</option>
            <option value="cohort-2">cohort-2</option>
          </select>
          
          <select 
            className="px-4 py-2 border rounded-full bg-white text-sm outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="suspended">suspended</option>
            <option value="dropout">dropout</option>
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
        <ParticipantsTable 
          participants={filteredParticipants} 
          onView={handleView}
          onEdit={handleEdit}
         />
      </div>
    </div>
  );
}