import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Kumar Singh | AI Engineer",
  description: "Portfolio of Aditya Kumar Singh, AI Engineer and Data Scientist.",
};

import { NeuralBackground } from "../components/neural-background";
import { CustomCursor } from "../components/ui/custom-cursor";
import { SystemStatus } from "../components/system-status";
import { AiContextMenu } from "../components/ui/ai-context-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <NeuralBackground />
        <CustomCursor />
        {/* <SystemStatus /> Removed per user request */}
        <AiContextMenu />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
