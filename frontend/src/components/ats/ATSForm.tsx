"use client";

import { useState } from "react";
import { analyzeATS } from "@/services/api";

interface ATSResult {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
}

interface ATSFormProps {
  onResult: (result: ATSResult) => void;
}

export default function ATSForm({ onResult }: ATSFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const result: ATSResult = await analyzeATS(jobDescription);

      onResult(result);
    } catch (error) {
      console.error("ATS Analysis Error:", error);
      alert("Failed to analyze ATS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full rounded-lg border border-gray-300 p-4 h-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste the Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze ATS"}
      </button>
    </div>
  );
}