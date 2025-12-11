"use client";

import { useState } from "react";

import { User, Mail, MapPin, Building2, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import type { ProfileDetails, UserRole, Organization } from "@/types/profile";
import { organizations as orgData } from "@/lib/onboardingData";

interface DetailsStepProps {
  role: UserRole;
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ role, onNext, onBack }: DetailsStepProps) {
  const [form, setForm] = useState<ProfileDetails>({
    name: "",
    email: "",
    organization: "",
    location: "",
    extra: "",
  });

  const [focusedField, setFocusedField] = useState<string>("");


  const availableLocations: string[] =
    orgData.find((o) => o.name === form.organization)?.locations ?? [];

  
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isValid =
    form.name.trim() !== "" &&
    emailValid &&
    form.organization.trim() !== "" &&
    form.location.trim() !== "";


  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
     
      if (name === "organization") {
        return { ...prev, organization: value, location: "" };
      }
      return { ...prev, [name]: value };
    });
  }

  return (
  
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 mb-8">
          Role: <span className="text-sky-600 font-semibold">{role}</span>
        </p>

        <div className="space-y-4 mb-8">
       
          <div className="relative">
            <User className="absolute  left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="name"
              value={form.name}
              onChange={update}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              placeholder="Full name"
              className={`w-full pl-12 text-gray-500 bg-white pr-4 py-4 rounded-2xl border-2 outline-none ${
                focusedField === "name" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            />
          </div>

          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="email"
              value={form.email}
              onChange={update}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              placeholder="Email address"
              className={`w-full pl-12 pr-4 text-gray-500 bg-white py-4 rounded-2xl border-2 outline-none ${
                focusedField === "email" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            />
            {!emailValid && form.email && (
              <p className="text-xs text-red-500 mt-1">Enter a valid email</p>
            )}
          </div>

          
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="organization"
              value={form.organization}
              onChange={update}
              onFocus={() => setFocusedField("organization")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl text-gray-500 bg-white border-2 outline-none  ${
                focusedField === "organization" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            >
              <option value="">Select organization</option>
              {orgData.map((org: Organization) => (
                <option key={org.name} value={org.name}>{org.name}</option>
              ))}
            </select>
          </div>

        
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="location"
              value={form.location}
              onChange={update}
              onFocus={() => setFocusedField("location")}
              onBlur={() => setFocusedField("")}
              disabled={!form.organization}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none text-gray-500 bg-white ${
                focusedField === "location" ? "border-sky-500 shadow-lg shadow-sky-100" : "border-gray-200"
              }`}
            >
              <option value="">
                {form.organization ? "Select location" : "Select organization first"}
              </option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              name="extra"
              value={form.extra}
              onChange={update}
              placeholder="Anything else? (optional)"
              className="w-full pl-12 pr-4 py-4 h-32 rounded-2xl border-2 text-gray-500 bg-white border-gray-200"
            />
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
            disabled={!isValid}
            onClick={onNext}
            className={`px-8 py-4 rounded-full flex items-center gap-2 font-semibold transition-all ${
              isValid
                ? "bg-linear-to-r from-gray-600 to-sky-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit <ArrowRight size={20} />
          </button>
        </div>
      </div>
   
  );
}
