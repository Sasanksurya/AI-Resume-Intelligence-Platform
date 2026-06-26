import json

from app.services.rag_service import RAGService
from app.services.ai_service import AIService


class ResumeSummaryService:

    @staticmethod
    def generate_summary():

        docs = RAGService.search("resume")

        if not docs:
            return {
                "name": "Not Found",
                "skills": [],
                "experience": "Not Found",
                "education": "Not Found",
            }

        context = "\n\n".join(doc.page_content for doc in docs)

        prompt = f"""
You are an AI Resume Parser.

Extract the following information from this resume.

Resume:
{context}

Return ONLY valid JSON.

{{
    "name": "",
    "skills": [],
    "experience": "",
    "education": ""
}}

Return ONLY JSON.
"""

        try:
            response = AIService.generate(prompt)

            if response.startswith("```json"):
                response = (
                    response.replace("```json", "")
                    .replace("```", "")
                    .strip()
                )

            elif response.startswith("```"):
                response = (
                    response.replace("```", "")
                    .strip()
                )

            return json.loads(response)

        except Exception as e:

            return {
                "name": "AI Summary Unavailable",
                "skills": [],
                "experience": "Gemini API quota exceeded.",
                "education": "",
            }