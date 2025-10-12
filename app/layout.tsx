import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";
import { Toaster } from "sonner";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "To do - DevDotCed",
  description: "A simple to-do list built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} antialiased relative`}
      >
        <Toaster position="top-center" richColors />
        <Header />
        {children}
      </body>
    </html>
  );
}
