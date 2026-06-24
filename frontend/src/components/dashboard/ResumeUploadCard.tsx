"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { uploadResume } from "@/lib/api";
import ResumeDropzone from "@/components/resume/ResumeDropzone";

export default function ResumeUploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF resume.");
      return;
    }

    const loadingToast = toast.loading("Uploading resume...");

    try {
      setUploading(true);

      const result = await uploadResume(selectedFile);

      toast.dismiss(loadingToast);

      toast.success(
        result.message || "Resume uploaded successfully!"
      );

      setSelectedFile(null);
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);

      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-8 shadow-xl">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Upload Resume
      </h2>

      <ResumeDropzone
        onFileSelect={(file) => {
          setSelectedFile(file);
        }}
      />

      <div className="mt-6 flex justify-center">

        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100"
        >
          {uploading ? "Uploading Resume..." : "Upload Resume"}
        </button>

      </div>

    </div>
  );
}