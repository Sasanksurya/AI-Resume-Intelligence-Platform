import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexaura",
  description:
    "Nexaura is an AI-powered resume analysis platform that helps job seekers optimize resumes, analyze ATS scores, compare resumes with job descriptions, and chat with their resumes using AI.",
  keywords: [
    "Nexaura",
    "Resume Analyzer",
    "ATS Score",
    "Resume Chat",
    "Resume Optimization",
    "AI Resume",
    "Job Match Analysis",
    "Career Assistant",
    "Resume Builder",
    "AI Career Platform",
  ],
  authors: [
    {
      name: "Shashank Surya Thota",
    },
  ],
  creator: "Shashank Surya Thota",
  applicationName: "Nexaura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-950 text-white">
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#ffffff",
              border: "1px solid #06b6d4",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}