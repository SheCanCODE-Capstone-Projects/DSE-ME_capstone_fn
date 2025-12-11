"use client";

import { useRouter } from "next/navigation";
import RoleStep from "@/components/onboarding/steps/RoleStep";

export default function Page() {
  const router = useRouter();
  return (
    <RoleStep
      onNext={(role) => router.push(`/request-access/details?role=${role}`)}
    />
  );
}
