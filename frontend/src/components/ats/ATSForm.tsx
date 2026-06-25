"use client";

import { useState } from "react";
import { analyzeATS } from "@/lib/api";

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
    <div className="space-y-6">
      {/* Job Description Input */}
      <div>
        <label className="mb-2 block text-lg font-semibold text-white">
          Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete Job Description here..."
          className="
            w-full
            h-64
            rounded-xl
            border
            border-gray-600
            bg-slate-900
            text-white
            placeholder:text-gray-400
            p-4
            text-sm
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="
          rounded-lg
          bg-blue-600
          px-8
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:bg-gray-500
        "
      >
        {loading ? "Analyzing ATS..." : "Analyze ATS"}
      </button>
    </div>
  );
}