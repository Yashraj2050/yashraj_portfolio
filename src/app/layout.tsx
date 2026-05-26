import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Yashraj Kuyate — Ethical Hacker · AI Researcher · Full-Stack Developer",
  description: "Cinematic interactive portfolio of Yashraj Dnyaneshwar Kuyate. AI deepfake detection, decentralized network research, zero-trust architectures, and full-stack web engineering.",
  keywords: ["Yashraj Kuyate", "Ethical Hacker", "AI Researcher", "Full-Stack Developer", "Deepfake Detection", "Fiduscan", "Hidden Networks", "Portfolio"],
  authors: [{ name: "Yashraj Dnyaneshwar Kuyate" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Yashraj Kuyate — Ethical Hacker · AI Researcher · Full-Stack Developer",
    description: "Cinematic interactive portfolio — AI deepfake detection, decentralized network research, and full-stack web engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Kuyate — Ethical Hacker · AI Researcher · Full-Stack Developer",
    description: "Cinematic interactive portfolio — AI deepfake detection, decentralized network research, and full-stack web engineering.",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

