"use client";

import Navbar from "@/components/dashboard/Navbar";
import HeroSection from "@/components/dashboard/HeroSection";
import FeatureCards from "@/components/dashboard/FeatureCards";

import UploadSection from "@/components/dashboard/UploadSection";
import ChatSection from "@/components/dashboard/ChatSection";
import ATSSection from "@/components/dashboard/ATSSection";
import InterviewSection from "@/components/dashboard/InterviewSection";
import ImproveResumeSection from "@/components/dashboard/ImproveResumeSection";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import Footer from "@/components/dashboard/Footer";

export default function DashboardPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard */}
      <main className="min-h-screen bg-slate-950">

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pt-10">
          <HeroSection />
        </section>

        {/* Feature Cards */}
        <section className="mx-auto max-w-7xl px-6 py-8">
          <FeatureCards />
        </section>

        {/* Upload Resume */}
        <section
          id="upload"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <UploadSection />
        </section>

        {/* AI Resume Chat */}
        <section
          id="chat"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <ChatSection />
        </section>

        {/* ATS Analysis */}
        <section
          id="ats"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <ATSSection />
        </section>

        {/* Interview Preparation */}
        <section
          id="interview"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <InterviewSection />
        </section>

        {/* Resume Improvement */}
        <section
          id="improve"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <ImproveResumeSection />
        </section>

        {/* Dashboard Analytics */}
        <section
          id="analytics"
          className="mx-auto max-w-7xl px-6 py-8"
        >
          <DashboardAnalytics
            summary={{
              name: "SASANK SURYA THOTA",
              skills:
                "Python, SQL, FastAPI, LangChain, FAISS, Machine Learning, NLP",
              experience: "Software Development Intern",
              education:
                "B.Tech Computer Science & Business Systems",
            }}
          />
        </section>

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}