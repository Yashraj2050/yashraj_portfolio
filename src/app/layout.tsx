import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinematic Portfolio | AI Engineer & Researcher",
  description: "An immersive cinematic portfolio experience showcasing AI engineering, machine learning research, and intelligent systems development.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Portfolio", "Research", "Cinematic"],
  authors: [{ name: "AI Engineer" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Cinematic Portfolio | AI Engineer & Researcher",
    description: "An immersive cinematic portfolio experience showcasing AI engineering and research.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinematic Portfolio | AI Engineer & Researcher",
    description: "An immersive cinematic portfolio experience showcasing AI engineering and research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
