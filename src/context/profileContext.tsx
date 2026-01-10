"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
};

const defaultProfile: Profile = {
  fullName: "Debz Tt",
  email: "debtz@gmail.com",
  phone: "+250 7912345678",
  location: "SheCanCode Hub",
  bio: "",
  avatar: "",
};

const ProfileContext = createContext<{
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
} | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
};
