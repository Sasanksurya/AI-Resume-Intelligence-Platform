"use client";

import { useState } from "react";

import ATSForm from "@/components/ats/ATSForm";
import ATSResult from "@/components/ats/ATSResult";

interface ATSData {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
}

export default function ATSPage() {
  const [result, setResult] = useState<ATSData | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        <h1 className="text-4xl font-bold text-white text-center">
          AI Resume ATS Analyzer
        </h1>

        <ATSForm onResult={setResult} />

        <ATSResult result={result} />

      </div>
    </main>
  );
}