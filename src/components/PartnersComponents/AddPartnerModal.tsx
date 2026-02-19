import { useState } from "react";
import { X, Plus, Trash2, MapPin } from "lucide-react";
import { type Partner } from "@/types/partners";

interface Branch {
  id: string;
  name: string;
  province: string;
  district: string;
  address: string;
}

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (partner: Partner) => void;
}

export default function AddPartnerModal({ isOpen, onClose, onCreate }: AddPartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "Kigali City",
    district: "",
    staff: "",
    type: "Tech Hub"
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [showBranches, setShowBranches] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addBranch = () => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: "",
      province: "Kigali City",
      district: "",
      address: ""
    };
    setBranches(prev => [...prev, newBranch]);
  };

  const updateBranch = (id: string, field: keyof Branch, value: string) => {
    setBranches(prev => prev.map(branch => 
      branch.id === id ? { ...branch, [field]: value } : branch
    ));
  };

  const removeBranch = (id: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPartner = {
      id: Date.now().toString(),
      ...formData,
      staff: parseInt(formData.staff) || 0,
      status: "Pending" as const,
      joinDate: new Date().toISOString().split('T')[0],
      totalParticipants: 0,
      activeParticipants: 0,
      completedParticipants: 0,
      dropoutRate: 0,
      employmentRate: 0,
      internshipPlacementRate: 0,
      programs: 0,
      participantsWithDisability: 0,
      femaleParticipants: 0,
      maleParticipants: 0,
      branches: branches.filter(b => b.name && b.district)
    };
    onCreate(newPartner);
    setFormData({
      name: "",
      email: "",
      phone: "",
      province: "Kigali City",
      district: "",
      staff: "",
      type: "Tech Hub"
    });
    setBranches([]);
    setShowBranches(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Implementation Partner</h2>
            <p className="text-sm text-gray-600">Create a new partner organization</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Organization Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Klab Rwanda"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  >
                    <option value="Tech Hub">Tech Hub</option>
                    <option value="NGO">NGO</option>
                    <option value="Educational Institution">Educational Institution</option>
                    <option value="Training Center">Training Center</option>
                    <option value="University">University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staff Count
                  </label>
                  <input
                    type="number"
                    name="staff"
                    value={formData.staff}
                    onChange={handleChange}
                    placeholder="Number of staff members"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@partner.rw"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+250-XXX-XXX-XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Location Information Card */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  >
                    <option value="Kigali City">Kigali City</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="Western Province">Western Province</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g., Gasabo, Musanze, Kayonza"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Branches Section */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Branch Locations</h3>
                  <p className="text-sm text-gray-600">Add additional branch locations (optional)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBranches(!showBranches)}
                  className="text-[#0B609D] hover:text-[#094d7d] font-medium text-sm transition-colors"
                >
                  {showBranches ? 'Hide Branches' : 'Add Branches'}
                </button>
              </div>

              {showBranches && (
                <div className="space-y-4">
                  {branches.map((branch, index) => (
                    <div key={branch.id} className="bg-white rounded-2xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Branch {index + 1}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBranch(branch.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Branch name"
                            value={branch.name}
                            onChange={(e) => updateBranch(branch.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <select
                            value={branch.province}
                            onChange={(e) => updateBranch(branch.id, 'province', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent text-sm"
                          >
                            <option value="Kigali City">Kigali City</option>
                            <option value="Northern Province">Northern Province</option>
                            <option value="Southern Province">Southern Province</option>
                            <option value="Eastern Province">Eastern Province</option>
                            <option value="Western Province">Western Province</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="District"
                            value={branch.district}
                            onChange={(e) => updateBranch(branch.id, 'district', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Full address (optional)"
                            value={branch.address}
                            onChange={(e) => updateBranch(branch.id, 'address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B609D] focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addBranch}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#0B609D] hover:text-[#0B609D] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Branch Location
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-white sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email || !formData.district}
            className="px-6 py-2 text-sm font-medium text-white bg-[#0B609D] rounded-lg hover:bg-[#094d7d] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add Partner
          </button>
        </div>
      </div>
    </div>
  );
}