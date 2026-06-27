"use client";

import { useState } from "react";
import { analyzeATS } from "@/services/api";

interface ATSResult {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
  career_advice?: string;
  crew_analysis?: string;
}

export default function ATSSection() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [isCrewResult, setIsCrewResult] = useState(false);

  // Fast single AI analysis
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description.");
      return;
    }
    try {
      setLoading(true);
      setIsCrewResult(false);
      const data = await analyzeATS(jobDescription);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("ATS Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  // Deep CrewAI multi-agent analysis
  const handleCrewAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description.");
      return;
    }
    try {
      setCrewLoading(true);
      setIsCrewResult(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ats-score-crew`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job_description: jobDescription }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "CrewAI Analysis Failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("CrewAI Analysis Failed. Try again.");
    } finally {
      setCrewLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">
        ATS Resume Analysis
      </h2>

      <p className="mt-2 text-slate-400">
        Paste a job description to analyze how well your resume matches.
      </p>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste Job Description here..."
        className="mt-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none placeholder-slate-500 focus:ring-2 focus:ring-cyan-500"
      />

      {/* Two buttons — Fast and CrewAI */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">

        {/* Fast Analysis Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || crewLoading}
          className="flex-1 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Analyzing...
            </span>
          ) : "Quick Analysis"}
        </button>

        {/* CrewAI Deep Analysis Button */}
        <button
          onClick={handleCrewAnalyze}
          disabled={loading || crewLoading}
          className="flex-1 rounded-xl bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50 transition-all"
        >
          {crewLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              4 Agents Working... (30s)
            </span>
          ) : "Deep Analysis with CrewAI"}
        </button>

      </div>

      {/* CrewAI badge */}
      {isCrewResult && result && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-900 px-4 py-1 text-sm text-purple-300">
          <span> </span>
          <span>Powered by CrewAI — 4 Agents collaborated on this analysis</span>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">

          {/* ATS Score */}
          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-cyan-400">ATS Score</h3>
            <p className={`mt-3 text-6xl font-bold ${getScoreColor(result.ats_score)}`}>
              {result.ats_score}%
            </p>

            {/* Score bar */}
            <div className="mt-4 h-3 w-full rounded-full bg-slate-700">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${getScoreBg(result.ats_score)}`}
                style={{ width: `${result.ats_score}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {result.ats_score >= 80
                ? "Excellent match! You are a strong candidate."
                : result.ats_score >= 60
                ? "Good match. A few improvements can boost your chances."
                : "Low match. Tailor your resume to this job description."}
            </p>
          </div>

          {/* Matched Skills */}
          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-green-400">
              Matched Skills ({result.matched_skills.length})
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.matched_skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-900 px-3 py-1 text-sm text-green-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-red-400">
              Missing Skills ({result.missing_skills.length})
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.missing_skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-900 px-3 py-1 text-sm text-red-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="text-xl font-bold text-yellow-400">
              Suggestions
            </h3>
            <ul className="mt-3 space-y-2">
              {result.suggestions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white">
                  <span className="mt-1 text-yellow-400">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Advice — only shown for CrewAI results */}
          {isCrewResult && result.career_advice && (
            <div className="rounded-xl border border-purple-700 bg-purple-950 p-6">
              <h3 className="text-xl font-bold text-purple-300">
                Career Coach Advice
              </h3>
              <p className="mt-3 whitespace-pre-wrap text-slate-300 leading-relaxed">
                {result.career_advice}
              </p>
            </div>
          )}

        </div>
      )}

    </section>
  );
}