"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { uploadResume } from "@/lib/api";

export default function ResumeUploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      setUploading(true);

      const result = await uploadResume(selectedFile);

      setMessage(result.message);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Upload Resume
      </h2>

      <div className="border-2 border-dashed border-cyan-500 rounded-xl p-10 text-center">

        <Upload className="mx-auto h-16 w-16 text-cyan-400 mb-4" />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setSelectedFile(e.target.files?.[0] || null)
          }
          className="mb-6"
        />

        {selectedFile && (
          <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4">
            <FileText />
            <span>{selectedFile.name}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {message && (
          <p className="mt-4 text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
}