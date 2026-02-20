import { useState, useEffect } from "react";
import { MessageSquare, ArrowLeft, ArrowRight, Building2, MapPin } from "lucide-react";
import type { UserRole } from "@/types/profile";
import { authApi } from "@/lib/authApi";
import { Partner, Center } from "@/types/auth";

interface DetailsStepProps {
  role: UserRole;
  onNext: (data: { reason: string; organizationPartnerId: string; locationCenterId: string }) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function DetailsStep({ role, onNext, onBack, isLoading = false }: DetailsStepProps) {
  const [reason, setReason] = useState('');
  const [organizationPartnerId, setOrganizationPartnerId] = useState('');
  const [locationCenterId, setLocationCenterId] = useState('');
  const [focusedField, setFocusedField] = useState<string>("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [loadingCenters, setLoadingCenters] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true);
        const data = await authApi.getPartners();
        setPartners(data);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setLoadingPartners(false);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchCenters = async () => {
      if (!organizationPartnerId) {
        setFilteredCenters([]);
        setLocationCenterId('');
        return;
      }
      try {
        setLoadingCenters(true);
        const data = await authApi.getCentersByPartner(organizationPartnerId);
        setFilteredCenters(data);
        // Reset location if current selection is not in filtered list
        if (locationCenterId && !data.find(c => c.centerId === locationCenterId)) {
          setLocationCenterId('');
        }
      } catch (error) {
        console.error('Failed to fetch centers:', error);
        setFilteredCenters([]);
      } finally {
        setLoadingCenters(false);
      }
    };
    fetchCenters();
  }, [organizationPartnerId]);

  const isValid = reason.trim().length >= 10 && organizationPartnerId && locationCenterId;

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;
    onNext({ reason, organizationPartnerId, locationCenterId });
  };

  return (
  
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 mb-8">
          Role: <span className="text-sky-600 font-semibold">{role}</span>
        </p>

        <div className="space-y-4 mb-8">
          {/* Organization Selection */}
          <div className="relative">
            <Building2 className="absolute left-4 top-4 text-gray-400" size={20} />
            <select
              value={organizationPartnerId}
              onChange={(e) => setOrganizationPartnerId(e.target.value)}
              onFocus={() => setFocusedField("organization")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-gray-700 bg-white outline-none appearance-none ${
                focusedField === "organization" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
              disabled={loadingPartners}
            >
              <option value="">Select Organization</option>
              {partners.map((partner) => (
                <option key={partner.partnerId} value={partner.partnerId}>
                  {partner.partnerName} ({partner.country})
                </option>
              ))}
            </select>
            {!organizationPartnerId && (
              <p className="text-xs text-gray-500 mt-1 ml-12">Please select the organization you work for</p>
            )}
          </div>

          {/* Location Selection */}
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
            <select
              value={locationCenterId}
              onChange={(e) => setLocationCenterId(e.target.value)}
              onFocus={() => setFocusedField("location")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-gray-700 bg-white outline-none appearance-none ${
                focusedField === "location" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
              disabled={!organizationPartnerId || loadingCenters}
            >
              <option value="">Select Location/Branch</option>
              {filteredCenters.map((center) => (
                <option key={center.centerId} value={center.centerId}>
                  {center.centerName} - {center.location}
                </option>
              ))}
            </select>
            {!organizationPartnerId && (
              <p className="text-xs text-gray-500 mt-1 ml-12">Please select an organization first</p>
            )}
            {organizationPartnerId && !locationCenterId && !loadingCenters && (
              <p className="text-xs text-gray-500 mt-1 ml-12">Please select your location/branch</p>
            )}
            {loadingCenters && (
              <p className="text-xs text-gray-500 mt-1 ml-12">Loading locations...</p>
            )}
          </div>

          {/* Reason Textarea */}
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onFocus={() => setFocusedField("reason")}
              onBlur={() => setFocusedField("")}
              placeholder="Why do you need this role? Please provide details about your background and how you plan to use this access..."
              className={`w-full pl-12 pr-4 py-4 h-32 rounded-2xl border-2 text-gray-500 bg-white outline-none ${
                focusedField === "reason" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            />
            {reason.trim().length > 0 && reason.trim().length < 10 && (
              <p className="text-xs text-red-500 mt-1">Please provide at least 10 characters</p>
            )}
          </div>
        </div>

       
        <div className="flex justify-between gap-3">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <button
            disabled={!isValid || isLoading}
            onClick={handleSubmit}
            className={`px-8 py-4 rounded-full flex items-center gap-2 font-semibold transition-all ${
              isValid && !isLoading
                ? "bg-gradient-to-r from-gray-600 to-sky-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
   
  );
}