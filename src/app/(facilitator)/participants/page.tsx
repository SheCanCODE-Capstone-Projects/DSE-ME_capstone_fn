"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "@/components/IconButton";
import { Plus, Users, UserX, UserCheck, User, Download } from "lucide-react";

/* ================= ADD PARTICIPANT MODAL ================= */
function AddParticipantModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Participant</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
           <select className="mt-1 w-full px-4 py-2 border rounded-lg bg-white">
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="mt-1 w-full px-4 py-2 border rounded-lg bg-white">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className=" gap-3 pt-4">
          
  <IconButton
    
    label="Add Participant"
    type="submit"
  />


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
  participant: any;
  onClose: () => void;
}) {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Participant Details</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm">
          <p><span className="font-medium">ID:</span> {participant.id}</p>
          <p><span className="font-medium">Name:</span> {participant.name}</p>
          <p><span className="font-medium">Gender:</span> {participant.gender}</p>
          <p><span className="font-medium">Age:</span> {participant.age}</p>
          <p><span className="font-medium">Phone:</span> {participant.phone}</p>
          <p><span className="font-medium">Email:</span> example@email.com</p>
          <p><span className="font-medium">Enrollment Date:</span> {participant.enrollmentDate}</p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                participant.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
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


/* ================= MAIN PAGE ================= */
function Participant() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
const [selectedParticipant, setSelectedParticipant] = useState<any>(null);


  const stats = [
    { title: "Total Active", value: 41, icon: Users },
    { title: "Inactive", value: 3, icon: UserX },
    { title: "Female", value: 25, icon: UserCheck },
    { title: "Male", value: 17, icon: User },
  ];

  const ParticipantsTable = () => {
    const [participants] = useState([
      {
        id: "001",
        name: "Nedege Isi",
        gender: "Female",
        age: 24,
        phone: "0781234567",
        enrollmentDate: "2025-01-01",
        status: "Active",
      },
      {
        id: "002",
        name: "Nedege Isi",
        gender: "Female",
        age: 24,
        phone: "0781234567",
        enrollmentDate: "2025-01-01",
        status: "Active",
      },
      {
        id: "003",
        name: "Nedege Isi",
        gender: "Female",
        age: 24,
        phone: "0781234567",
        enrollmentDate: "2025-01-01",
        status: "Active",
      },
      {
        id: "004",
        name: "Nedege Isi",
        gender: "Female",
        age: 24,
        phone: "0781234567",
        enrollmentDate: "2025-01-01",
        status: "Active",
      },
      {
        id: "005",
        name: "Nedege Isi",
        gender: "Female",
        age: 24,
        phone: "0781234567",
        enrollmentDate: "2025-01-01",
        status: "Active",
      },
    ]);

  const handleView = (participant: any) => {
  setSelectedParticipant(participant);
  setViewOpen(true);
};

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y rounded-lg divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Enrollment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td className="px-6 py-4 text-sm">
                  {participant.id}
                </td>
                <td className="px-6 py-4 text-sm">
                  {participant.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  {participant.gender}
                </td>
                <td className="px-6 py-4 text-sm">
                  {participant.age}
                </td>
                <td className="px-6 py-4 text-sm">
                  {participant.phone}
                </td>
                <td className="px-6 py-4 text-sm">
                  {participant.enrollmentDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      participant.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {participant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
              onClick={() => handleView(participant)}
             className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
              View
               </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Participants Management
          </h1>
          <p className="mt-2">
            Manage and track all participants in your cohort.
          </p>
        </div>

        <div className="flex items-center mb-6">
          <IconButton
            onClick={() => setOpen(true)}
            icon={<Plus className="w-5 h-5" />}
            label="Add Participant"
          />
        </div>
      </div>

      {open && <AddParticipantModal onClose={() => setOpen(false)} />}
        
 {viewOpen && (
  <ViewParticipantModal
    participant={selectedParticipant}
    onClose={() => setViewOpen(false)}
  />
)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4"
            >
              <Icon className="w-6 h-6 text-[#0B609D]" />
              <div>
                <p className="text-xl font-bold">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between gap-4">
        <label className="text-xl font-bold">Search</label>
        <input
          type="text"
          placeholder="Search participant by names and ID ....."
          className="px-4 py-2 border w-full rounded-md"
        />

        <select className="px-4 py-2 border rounded-md">
          <option disabled selected>
            More Filters
          </option>
          <option>By Gender</option>
          <option>By Status</option>
        </select>

        <IconButton icon={<Download className="w-5 h-5" />} label="Export" />
      </div>

      <div className="bg-white rounded-lg shadow">
        <ParticipantsTable />
      </div>
    </div>
  );
}

export default Participant;
