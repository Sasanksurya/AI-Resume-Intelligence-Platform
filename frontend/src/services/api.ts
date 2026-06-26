const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ------------------------------------
// Common Request Handler
// ------------------------------------
async function request(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Something went wrong.");
  }

  return response.json();
}

// ------------------------------------
// Upload Resume
// ------------------------------------
export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return request("/upload", {
    method: "POST",
    body: formData,
  });
}

// ------------------------------------
// Resume Summary
// ------------------------------------
export async function getResumeSummary() {
  return request("/resume-summary");
}

// ------------------------------------
// Resume Chat
// ------------------------------------
export async function askResume(question: string) {
  return request("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });
}

// ------------------------------------
// ATS Analysis
// ------------------------------------
export async function analyzeATS(jobDescription: string) {
  return request("/ats-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_description: jobDescription,
    }),
  });
}

// ------------------------------------
// Interview Questions
// ------------------------------------
export async function getInterviewQuestions() {
  return request("/interview");
}

// ------------------------------------
// Resume Improvement
// ------------------------------------
export async function improveResume() {
  return request("/improve");
}