'use client'
import React, { useEffect, useRef } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Save, User } from 'lucide-react';
import { useProfile } from "../../context/profileContext";

function Input({
  label,
  icon: Icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700
            focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500"
        />
      </div>
    </div>
  );
}
function ProfilePanel() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { profile, setProfile } = useProfile();

  useEffect(() => {
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, [setProfile]);

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

      <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100">
        <div className="relative group">
          <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-lg bg-slate-100 flex items-center justify-center">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-slate-400" />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleAvatarChange(e.target.files[0]);
              }
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 border-2 border-white"
          >
            <Camera size={18} />
          </button>
        </div>

        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            {profile.fullName}
          </h2>
          <p className="text-slate-500 font-medium">
            Facilitator • SheCanCode
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Full Name"
          icon={Briefcase}
          value={profile.fullName}
          onChange={(v) => setProfile({ ...profile, fullName: v })}
        />
        <Input
          label="Email Address"
          icon={Mail}
          value={profile.email}
          onChange={(v) => setProfile({ ...profile, email: v })}
        />
        <Input
          label="Phone Number"
          icon={Phone}
          value={profile.phone}
          onChange={(v) => setProfile({ ...profile, phone: v })}
        />
        <Input
          label="Location Center"
          icon={MapPin}
          value={profile.location}
          onChange={(v) => setProfile({ ...profile, location: v })}
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Short Bio
        </label>
        <textarea
          rows={3}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700
            focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 resize-none"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white
            bg-sky-600 hover:bg-sky-700 rounded-lg shadow-md"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfilePanel;
