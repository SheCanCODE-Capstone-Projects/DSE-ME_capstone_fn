"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
};

const defaultProfile: Profile = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  avatar: "",
};

const ProfileContext = createContext<{
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
} | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setProfile((prev) => ({
      ...prev,
      fullName: prev.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
      email: user.email,
    }));
  }, [user]);

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
