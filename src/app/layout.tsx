import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

import { ProfileProvider } from "../context/profileContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSE M&E Platform",
  description: "A secure, multi-tenant Monitoring & Evaluation platform for tracking training, employment outcomes, and impact across donor-funded programs.",
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

