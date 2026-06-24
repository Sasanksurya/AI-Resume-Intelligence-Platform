import os
import json
import time

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService

load_dotenv()


class ATSService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def analyze(job_description: str):

        docs = RAGService.search(job_description)

        if not docs:
            return {
                "ats_score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "suggestions": [
                    "No resume has been uploaded."
                ]
            }

        context = "\n\n".join(doc.page_content for doc in docs)

        prompt = f"""
You are an ATS Resume Analyzer.

Compare the resume with the Job Description.

Resume:
{context}

Job Description:
{job_description}

Return ONLY valid JSON in this exact format.

{{
    "ats_score": 85,
    "matched_skills": [
        "Python",
        "FastAPI"
    ],
    "missing_skills": [
        "Docker",
        "AWS"
    ],
    "suggestions": [
        "Add Docker experience.",
        "Mention AWS projects.",
        "Include more measurable achievements."
    ]
}}

Return ONLY JSON.
Do not use markdown.
Do not explain anything.
"""

        retries = 3

        for attempt in range(retries):

            try:

                response = ATSService.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "").replace("```", "").strip()
                elif text.startswith("```"):
                    text = text.replace("```", "").strip()

                return json.loads(text)

            except json.JSONDecodeError:

                return {
                    "ats_score": 0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "suggestions": [
                        "Gemini returned an invalid response. Please try again."
                    ]
                }

            except Exception as e:

                error = str(e)

                # Retry on temporary server errors
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue

                # Quota exceeded
                if "429" in error or "RESOURCE_EXHAUSTED" in error:
                    return {
                        "ats_score": 0,
                        "matched_skills": [],
                        "missing_skills": [],
                        "suggestions": [
                            "Gemini API quota exceeded. Please try again later or use a new API key."
                        ]
                    }

                # Authentication issues
                if "API_KEY" in error or "401" in error:
                    return {
                        "ats_score": 0,
                        "matched_skills": [],
                        "missing_skills": [],
                        "suggestions": [
                            "Invalid Gemini API key. Please check your .env file."
                        ]
                    }

                # Generic error
                return {
                    "ats_score": 0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "suggestions": [
                        f"Unexpected Error: {error}"
                    ]
                }