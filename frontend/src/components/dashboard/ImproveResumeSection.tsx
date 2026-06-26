"use client";

import { useState } from "react";
import { improveResume } from "@/services/api";

interface ImproveResult {
  improved_summary: string;
  improved_experience: string[];
  improved_projects: string[];
  tips: string[];
}

export default function ImproveResumeSection() {
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<ImproveResult | null>(null);

  const handleImprove = async () => {
    try {
      setLoading(true);

      const data = await improveResume();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to improve resume.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold text-white">
          AI Resume Improvement
        </h2>

        <button
          onClick={handleImprove}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? "Improving..." : "Improve Resume"}
        </button>

      </div>

      {!result && (
        <p className="mt-8 text-slate-400">
          Click the button to let AI improve your resume.
        </p>
      )}

      {result && (
        <div className="mt-8 space-y-8">

          <div className="rounded-2xl bg-slate-800 p-6">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold text-cyan-400">
                Improved Summary
              </h3>

              <button
                onClick={() => copyText(result.improved_summary)}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-white"
              >
                Copy
              </button>

            </div>

            <p className="mt-4 whitespace-pre-line text-white">
              {result.improved_summary || "No summary generated."}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-800 p-6">

            <h3 className="text-xl font-bold text-cyan-400">
              Improved Experience
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-white">

              {result.improved_experience.length > 0 ? (
                result.improved_experience.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No improvements available.</li>
              )}

            </ul>

          </div>

          <div className="rounded-2xl bg-slate-800 p-6">

            <h3 className="text-xl font-bold text-cyan-400">
              Improved Projects
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-white">

              {result.improved_projects.length > 0 ? (
                result.improved_projects.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No improvements available.</li>
              )}

            </ul>

          </div>

          <div className="rounded-2xl bg-slate-800 p-6">

            <h3 className="text-xl font-bold text-cyan-400">
              AI Suggestions
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-white">

              {result.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}

            </ul>

          </div>

        </div>
      )}

    </section>
  );
}