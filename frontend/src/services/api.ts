const API_URL = "http://127.0.0.1:8000/api";

// ------------------------------------
// Upload Resume
// ------------------------------------
export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

// ------------------------------------
// Get Resume Summary
// ------------------------------------
export async function getResumeSummary() {
  const response = await fetch(`${API_URL}/resume-summary`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

// ------------------------------------
// Resume Chat
// ------------------------------------
export async function askResume(question: string) {
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
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}


// ------------------------------------
// ATS Analysis
// ------------------------------------
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
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

// ------------------------------------
// Interview Questions
// ------------------------------------
export async function getInterviewQuestions() {
  const response = await fetch(`${API_URL}/interview`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

// ------------------------------------
// Resume Improvement
// ------------------------------------
export async function improveResume() {
  const response = await fetch(`${API_URL}/improve`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}