"use client";

import { useState } from "react";
import { analyzeATS } from "@/services/api";

interface ATSResult {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
}

export default function ATSSection() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<ATSResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const data = await analyzeATS(jobDescription);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("ATS Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">
        ATS Resume Analysis
      </h2>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste Job Description here..."
        className="mt-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="mt-8 space-y-6">

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-cyan-400">
              ATS Score
            </h3>

            <p className="mt-3 text-5xl font-bold text-white">
              {result.ats_score}%
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-green-400">
              Matched Skills
            </h3>

            <ul className="mt-3 list-disc pl-6 text-white">
              {result.matched_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-red-400">
              Missing Skills
            </h3>

            <ul className="mt-3 list-disc pl-6 text-white">
              {result.missing_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-yellow-400">
              Suggestions
            </h3>

            <ul className="mt-3 list-disc pl-6 text-white">
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </section>
  );
}