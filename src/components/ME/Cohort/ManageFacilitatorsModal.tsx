"use client";

import { useState, useEffect } from "react";
import { X, UserPlus, Trash2 } from "lucide-react";
import { useGetCohortFacilitators, useAssignFacilitatorsToCohort, useRemoveFacilitatorFromCohort, useGetMeFacilitatorsForCohort } from "@/hooks/me/useMeCohorts";
import toast from "react-hot-toast";

interface ManageFacilitatorsModalProps {
  cohortId: string | null;
  cohortName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageFacilitatorsModal({ cohortId, cohortName, isOpen, onClose }: ManageFacilitatorsModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const { data: allFacilitators = [], isLoading: loadingAll } = useGetMeFacilitatorsForCohort();
  const { data: assignedFacilitators = [], isLoading: loadingAssigned } = useGetCohortFacilitators(cohortId || "");
  const assignMutation = useAssignFacilitatorsToCohort();
  const removeMutation = useRemoveFacilitatorFromCohort();

  useEffect(() => {
    if (isOpen && assignedFacilitators) {
      setSelectedIds(assignedFacilitators.map((f: any) => f.facilitatorId || f.id));
    }
  }, [isOpen, assignedFacilitators]);

  const handleAdd = async () => {
    if (!cohortId || selectedIds.length === 0) return;
    try {
      await assignMutation.mutateAsync({ cohortId, facilitatorIds: selectedIds });
      toast.success("Facilitators assigned successfully");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to assign facilitators");
    }
  };

  const handleRemove = async (facilitatorId: string) => {
    if (!cohortId) return;
    try {
      await removeMutation.mutateAsync({ cohortId, facilitatorId });
      toast.success("Facilitator removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove facilitator");
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  const facilitatorName = (f: any) => {
    const parts = [f.firstName, f.lastName].filter(Boolean);
    return parts.length ? parts.join(" ") : f.email || "Unknown";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl p-6 z-10 w-full max-w-lg shadow-2xl border border-gray-200 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Manage Facilitators</h2>
            <p className="text-sm text-gray-500">{cohortName}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {loadingAll || loadingAssigned ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Currently Assigned</h3>
              {assignedFacilitators.length === 0 ? (
                <p className="text-sm text-gray-500">No facilitators assigned yet</p>
              ) : (
                <div className="space-y-2">
                  {assignedFacilitators.map((f: any) => (
                    <div key={f.facilitatorId || f.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{facilitatorName(f)}</p>
                        <p className="text-xs text-gray-500">{f.email}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(f.facilitatorId || f.id)}
                        disabled={removeMutation.isPending}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                <UserPlus size={16} className="inline mr-2" />
                Add Facilitators
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {allFacilitators.map((f: any) => {
                  const isSelected = selectedIds.includes(f.id);
                  const isAssigned = assignedFacilitators.some((af: any) => (af.facilitatorId || af.id) === f.id);
                  
                  return (
                    <label
                      key={f.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        isAssigned ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed" :
                        isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => !isAssigned && toggleSelection(f.id)}
                        disabled={isAssigned}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{facilitatorName(f)}</p>
                        <p className="text-xs text-gray-500">{f.email}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                disabled={assignMutation.isPending || selectedIds.length === 0}
                className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition disabled:opacity-60"
              >
                {assignMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
