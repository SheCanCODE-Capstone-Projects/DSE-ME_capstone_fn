"use client";

import "@/app/globals.css";
import TopProgress from "@/components/onboarding/TopProgress";
import { onboardingSteps } from "@/lib/onboardingSteps";
import { usePathname } from "next/navigation";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 

  const last = pathname.split("/").pop()?.toLowerCase() ?? "";

  const current = onboardingSteps.findIndex(
    (s) => s.toLowerCase() === last
  );

  const safeIndex = current === -1 ? 0 : current;

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="w-full py-6 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <TopProgress steps={onboardingSteps} active={safeIndex} />
        </div>
      </header>

      <main className="flex justify-center px-4 pb-12">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
