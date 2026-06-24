const API_URL = "http://127.0.0.1:8000/api";

// --------------------
// Upload Resume
// --------------------
export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

// --------------------
// Chat API
// --------------------
export async function askQuestion(question: string) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat failed");
  }

  return response.json();
}

// --------------------
// ATS API
// --------------------
export async function analyzeATS(jobDescription: string) {
  const response = await fetch(`${API_URL}/ats-score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_description: jobDescription,
    }),
  });

  if (!response.ok) {
    throw new Error("ATS Analysis failed");
  }

  return response.json();
}