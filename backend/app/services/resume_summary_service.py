import os
import json
from groq import Groq
from dotenv import load_dotenv

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService

load_dotenv()


class ResumeSummaryService:

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @staticmethod
    def generate_summary():

        full_text = VectorStoreService.load_resume_text()

        if not full_text.strip():
            return {
                "name": "Not Found",
                "skills": [],
                "experience": "Not Found",
                "education": "Not Found",
            }

        prompt = f"""
You are an AI Resume Parser.

Extract the following from this resume text.

Resume:
{full_text[:6000]}

Instructions:
- "name": The person's full name at the very top of the resume.
- "skills": All technical skills, tools, programming languages.
- "experience": All work experience and internships.
- "education": Degree, college name, graduation year.

Return ONLY valid JSON, no extra text:

{{
    "name": "",
    "skills": [],
    "experience": "",
    "education": ""
}}
"""

        try:
            response = ResumeSummaryService.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2048,
            )

            text = response.choices[0].message.content.strip()

            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()
            elif text.startswith("```"):
                text = text.replace("```", "").strip()

            return json.loads(text)

        except Exception as e:
            return {
                "name": "Not Found",
                "skills": [],
                "experience": f"Error: {str(e)}",
                "education": "Not Found",
            }