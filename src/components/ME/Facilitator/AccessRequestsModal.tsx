"use client";

import Modal from "./Modal";
import { Check, X, User } from "lucide-react";
import { RoleRequestResponse } from "@/types/auth";

interface AccessRequest extends RoleRequestResponse {
  createdAt: string;
}

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
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending access requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id || ''} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{request.userEmail}</h4>
                    <p className="text-sm text-gray-600">Requested Role: <span className="font-semibold capitalize">{request.requestedRole}</span></p>
                    <p className="text-xs text-gray-400 mt-1">
                      Requested: {request.requestedAt ? new Date(request.requestedAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => request.id && onApprove(request.id)}
                    disabled={loading || !request.id}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition text-sm disabled:opacity-50"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                  <button
                    onClick={() => request.id && onReject(request.id)}
                    disabled={loading || !request.id}
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