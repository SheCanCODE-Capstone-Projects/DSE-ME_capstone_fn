"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DetailsStep from "@/components/onboarding/steps/DetailsStep";
import type { UserRole } from "@/types/profile";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  const rawRole = params.get("role") ?? "";

 
  const role: UserRole | null = ["Partner", "ME", "Facilitator"].includes(rawRole)
    ? (rawRole as UserRole)
    : null;

  if (!role) {
    
    router.push("/request-access/role");
    return null;
  }

  return (
    <DetailsStep
      role={role}
      onNext={() => router.push("/request-access/finish")}
      onBack={() => router.back()}
    />
  );
}
