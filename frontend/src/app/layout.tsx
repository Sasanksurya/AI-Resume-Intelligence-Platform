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
  title: "Nexaura — AI Resume Intelligence Platform",
  description:
    "Nexaura is an AI-powered resume intelligence platform. Upload your resume, get ATS score, chat with AI about your resume, deep analysis with 4-agent AI pipeline, interview preparation, and career coaching. Built with FastAPI, Next.js, LangChain, FAISS, and Groq AI.",
  keywords: [
    "Nexaura",
    "AI Resume Analyzer",
    "ATS Score",
    "Resume Chat",
    "Resume Optimization",
    "AI Resume Platform",
    "Job Match Analysis",
    "Career Assistant",
    "Resume Builder",
    "AI Career Platform",
    "LangChain",
    "FAISS",
    "RAG Pipeline",
    "FastAPI",
    "Resume Intelligence",
    "ATS Analyzer",
    "Resume ATS Score",
    "AI Job Application",
    "Career Coach AI",
    "Interview Preparation AI",
    "Sasank Surya Thota",
  ],
  authors: [
    {
      name: "Sasank Surya Thota",
    },
  ],
  creator: "Sasank Surya Thota",
  applicationName: "Nexaura",
  verification: {
    google: "GyYAts8-C8CFMMGEPlRlS3rFjrn2jlf28nZNpQfQfCg",
  },
  openGraph: {
    title: "Nexaura — AI Resume Intelligence Platform",
    description:
      "Upload your resume and get instant AI analysis, ATS score, career coaching, and interview preparation powered by RAG pipeline and 4-agent AI system.",
    url: "https://ai-resume-intelligence-platform-two.vercel.app",
    siteName: "Nexaura",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexaura — AI Resume Intelligence Platform",
    description:
      "Upload your resume and get instant AI analysis, ATS score, career coaching, and interview preparation powered by RAG pipeline and 4-agent AI system.",
    creator: "@sasanksurya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://ai-resume-intelligence-platform-two.vercel.app",
  },
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