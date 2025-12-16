"use client";

import { useRouter } from "next/navigation";
import LandingStep from "@/components/onboarding/steps/LandingStep";

export default function Page() {
  const router = useRouter();
  return <LandingStep onNext={() => router.push("/request-access/role")} />;
}
