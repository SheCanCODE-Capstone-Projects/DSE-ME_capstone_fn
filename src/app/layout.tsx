import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

import { ProfileProvider } from "../context/profileContext";

export const metadata: Metadata = {
  title: "DSE M&E Platform",
  description: "A secure, multi-tenant Monitoring & Evaluation platform for tracking training, employment outcomes, and impact across donor-funded programs.",
  icons: "/icon2.png",

};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <Providers>
          <ProfileProvider>{children}</ProfileProvider>
        </Providers>
      </body>
    </html>
  );
}

