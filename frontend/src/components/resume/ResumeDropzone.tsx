"use client";

import { useRef, useState } from "react";

interface ResumeDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function ResumeDropzone({
  onFileSelect,
}: ResumeDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);

        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all
      ${
        dragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-400 bg-white"
      }`}
    >
      <div className="space-y-3">

        <div className="text-6xl">
            📄
        </div>

        <h2 className="text-xl font-bold">
            Drag & Drop Resume
        </h2>

        <p className="text-gray-500">
            or click to browse
        </p>

        {selectedFile && (
            <div className="rounded bg-green-100 p-3">
                ✅ {selectedFile.name}
            </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => {
          if (e.target.files?.length) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}