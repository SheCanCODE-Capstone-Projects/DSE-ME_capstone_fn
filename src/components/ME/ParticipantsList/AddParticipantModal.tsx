import { useState } from 'react';
import Modal from '../Facilitator/Modal';
import { useCreateParticipant } from '@/hooks/me/useMeParticipants';
import { useGetMeCohortsList, useGetMeCohortBatchesList } from '@/hooks/me/useMeCohorts';

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddParticipantModal({ isOpen, onClose }: AddParticipantModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    cohortId: '',
    gender: '',
  });

  const { data: cohortsData = [] } = useGetMeCohortsList();
  const { data: batchesData = [] } = useGetMeCohortBatchesList();
  const createParticipant = useCreateParticipant();

  const [selectedBatchId, setSelectedBatchId] = useState('');

  const filteredCohorts = selectedBatchId
    ? cohortsData.filter((c: any) => c.batch?.id === selectedBatchId)
    : [];

  const displayCohorts = selectedBatchId && filteredCohorts.length === 0 
    ? cohortsData 
    : filteredCohorts;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParticipant.mutateAsync(formData);
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        studentId: '',
        cohortId: '',
        gender: '',
      });
      setSelectedBatchId('');
    } catch (error: any) {
      alert(error.message || 'Failed to create participant');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Participant" width="w-[600px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cohort/Batch <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={selectedBatchId}
            onChange={(e) => {
              setSelectedBatchId(e.target.value);
              setFormData({ ...formData, cohortId: '' });
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="">Select Cohort/Batch</option>
            {batchesData.map((batch: any) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.cohortId}
            onChange={(e) => setFormData({ ...formData, cohortId: e.target.value })}
            disabled={!selectedBatchId}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Select Course</option>
            {displayCohorts.map((cohort: any) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.course?.name || cohort.name} {cohort.batch?.name ? `(${cohort.batch.name})` : ''}
              </option>
            ))}
          </select>
          {!selectedBatchId && (
            <p className="text-xs text-gray-500 mt-1">Please select a cohort/batch first</p>
          )}
          {selectedBatchId && filteredCohorts.length === 0 && displayCohorts.length > 0 && (
            <p className="text-xs text-amber-600 mt-1">No courses in this batch. Showing all available courses.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            disabled={createParticipant.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createParticipant.isPending}
            className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition disabled:opacity-50"
          >
            {createParticipant.isPending ? 'Creating...' : 'Add Participant'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
