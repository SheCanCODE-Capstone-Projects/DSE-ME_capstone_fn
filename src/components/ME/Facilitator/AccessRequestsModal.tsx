import Modal from "./Modal";
import { Check, X, User, Building2, MapPin } from "lucide-react";
import { RoleRequestResponse } from "@/types/auth";

interface AccessRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: RoleRequestResponse[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  loading?: boolean;
}

export default function AccessRequestsModal({
  isOpen,
  onClose,
  requests,
  onApprove,
  onReject,
  loading = false
}: AccessRequestsModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Access Requests">
      <div className="max-h-96 overflow-y-auto">
        <p className="text-xs text-gray-500 mb-3">
          For ME Officer requests, Donor should confirm with the organization&apos;s official email or contact records
          that this person truly represents that organization before approving.
        </p>
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending access requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request, index) => (
              <div key={request.id || `request-${index}`} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-base">
                      {request.requesterName || "Name not provided"}
                    </p>
                    <p className="text-sm text-gray-700">
                      {request.requesterEmail || request.userEmail || "—"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Requested Role: <span className="font-semibold capitalize">{request.requestedRole?.replace(/_/g, " ")}</span></p>
                    {request.organizationName && (
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <Building2 size={14} className="text-gray-400" />
                        Organization: <span className="font-medium">{request.organizationName}</span>
                      </p>
                    )}
                    {request.locationName && (
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        Location: <span className="font-medium">{request.locationName}</span>
                      </p>
                    )}
                    {request.reason && (
                      <p className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                        {request.reason}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Requested: {request.requestedAt ? new Date(request.requestedAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onApprove(request.id)}
                    disabled={loading}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition text-sm disabled:opacity-50"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(request.id)}
                    disabled={loading}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition text-sm disabled:opacity-50"
                  >
                    <X size={14} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}