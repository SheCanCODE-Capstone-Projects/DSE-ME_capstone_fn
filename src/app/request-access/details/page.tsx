"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DetailsStep from "@/components/onboarding/steps/DetailsStep";
import { useRequestRole } from "@/hooks/auth/useAccessRequests";
import toast from 'react-hot-toast';
import { useState } from 'react';

function DetailsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const requestRoleMutation = useRequestRole();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rawRole = params.get("role") ?? "";

  const roleMapping: Record<string, string> = {
    "Facilitator": "FACILITATOR",
    "ME": "ME_OFFICER", 
    "Partner": "DONOR"
  };

  const backendRole = roleMapping[rawRole];

  if (!backendRole) {
    router.push("/request-access/role");
    return null;
  }

  const handleSubmit = async (reason: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await requestRoleMutation.mutateAsync({
        requestedRole: backendRole as 'FACILITATOR' | 'ME_OFFICER' | 'DONOR',
        reason
      });
      
      toast.success('Access request submitted successfully!');
      router.push("/request-access/finish");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DetailsStep
      role={rawRole as any}
      onNext={handleSubmit}
      onBack={() => router.back()}
      isLoading={isSubmitting}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}