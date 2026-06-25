const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-resume-intelligence-platform-82el.onrender.com";

// -----------------------------
// Health
// -----------------------------
export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend is not running");
  }

  return response.json();
}

// -----------------------------
// Resume Upload
// -----------------------------
export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

// -----------------------------
// Resume Chat
// -----------------------------
export async function askQuestion(question: string) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}

// -----------------------------
// ATS Score
// -----------------------------
export async function analyzeATS(jobDescription: string) {
  const response = await fetch(`${API_URL}/api/ats-score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_description: jobDescription,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}