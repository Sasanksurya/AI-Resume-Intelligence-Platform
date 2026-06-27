import os
import json
import time

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService

load_dotenv()


class ATSService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def analyze(job_description: str):

        try:
            docs = RAGService.search(job_description)
        except Exception:
            docs = []

        if docs:
            context = "\n\n".join(doc.page_content for doc in docs)
        else:
            context = VectorStoreService.load_resume_text()

        if not context.strip():
            return {
                "ats_score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "suggestions": [
                    "Please upload your resume first before running ATS analysis."
                ]
            }

        prompt = f"""
You are an ATS Resume Analyzer.

Compare the Resume and the Job Description.

Resume:
{context}

Job Description:
{job_description}

Return ONLY valid JSON.

Example:

{{
  "ats_score": 85,
  "matched_skills": ["Python", "FastAPI"],
  "missing_skills": ["AWS", "Docker"],
  "suggestions": [
      "Mention Docker experience.",
      "Add AWS projects.",
      "Quantify achievements."
  ]
}}

Return ONLY JSON.
"""

        retries = 3

        for attempt in range(retries):

            try:

                response = ATSService.client.models.generate_content(
                    model="gemini-1.5-flash",
                    contents=prompt,
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "").replace("```", "").strip()
                elif text.startswith("```"):
                    text = text.replace("```", "").strip()

                data = json.loads(text)

                return {
                    "ats_score": int(data.get("ats_score", 0)),
                    "matched_skills": data.get("matched_skills", []),
                    "missing_skills": data.get("missing_skills", []),
                    "suggestions": data.get("suggestions", [])
                }

            except json.JSONDecodeError:
                return {
                    "ats_score": 0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "suggestions": ["Gemini returned invalid JSON."]
                }

            except Exception as e:
                error = str(e)
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue
                return {
                    "ats_score": 0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "suggestions": [error]
                }

        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": ["Unknown ATS error."]
        }