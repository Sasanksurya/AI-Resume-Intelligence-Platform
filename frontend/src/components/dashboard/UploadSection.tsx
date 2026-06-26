"use client";

import { useState } from "react";
import { uploadResume, getResumeSummary } from "@/services/api";

interface ResumeSummary {
  name: string;
  skills: string;
  experience: string;
  education: string;
}

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<ResumeSummary>({
    name: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading:", file.name);

      // STEP 1: Upload Resume
      const uploadResult = await uploadResume(file);
      console.log("Upload Result:", uploadResult);

      alert("Resume uploaded successfully!");

      // STEP 2: Generate Resume Summary
      try {
        const result = await getResumeSummary();
        console.log("Summary Result:", result);

        setSummary({
          name: result.summary?.name || "Not Found",

          skills: Array.isArray(result.summary?.skills)
            ? result.summary.skills.join(", ")
            : "Not Found",

          experience: result.summary?.experience || "Not Found",

          education: result.summary?.education || "Not Found",
        });
      } catch (summaryError) {
        console.error("Summary Error:", summaryError);

        alert(
          "Resume uploaded successfully.\n\nAI Resume Summary could not be generated because the Gemini API quota has been exceeded."
        );
      }
    } catch (uploadError) {
      console.error("Upload Error:", uploadError);

      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      {/* Upload Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Upload Resume
        </h2>

        <div className="flex h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-500">
          <p className="text-xl font-semibold text-white">
            Drag & Drop Resume
          </p>

          <p className="mt-2 text-slate-400">
            PDF Only
          </p>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="mt-6 text-white"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />

          {file && (
            <div className="mt-4 rounded-lg bg-slate-800 px-4 py-2">
              <p className="text-cyan-400">
                Selected: {file.name}
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </div>

      {/* Resume Summary */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Resume Summary
        </h2>

        <div className="space-y-4">
          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="text-sm text-slate-400">Name</h3>
            <p className="mt-2 text-white">{summary.name}</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="text-sm text-slate-400">Skills</h3>
            <p className="mt-2 text-white">{summary.skills}</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="text-sm text-slate-400">Experience</h3>
            <p className="mt-2 text-white">{summary.experience}</p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <h3 className="text-sm text-slate-400">Education</h3>
            <p className="mt-2 text-white">{summary.education}</p>
          </div>
        </div>
      </div>
    </section>
  );
}