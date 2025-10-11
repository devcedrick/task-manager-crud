import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task manager built with Next.js and Supabase.",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
