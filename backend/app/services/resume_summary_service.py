import json

from app.services.rag_service import RAGService
from app.services.ai_service import AIService


class ResumeSummaryService:

    @staticmethod
    def generate_summary():

        # Search with multiple targeted queries to get better coverage
        queries = [
            "name email phone contact",
            "skills programming languages tools",
            "work experience internship job",
            "education degree university college",
        ]

        seen = set()
        all_docs = []

        for query in queries:
            docs = RAGService.search(query, k=3)
            for doc in docs:
                content = doc.page_content
                if content not in seen:
                    seen.add(content)
                    all_docs.append(doc)

        if not all_docs:
            return {
                "name": "Not Found",
                "skills": [],
                "experience": "Not Found",
                "education": "Not Found",
            }

        context = "\n\n".join(doc.page_content for doc in all_docs)

        prompt = f"""
You are an AI Resume Parser. Extract the following information from this resume text.

Resume Text:
{context}

Instructions:
- For "name": Find the person's full name. It is usually the very first line or heading of the resume.
- For "skills": List all technical skills, tools, languages mentioned.
- For "experience": Summarize all work experience and internships.
- For "education": Summarize education details including degree and college name.

Return ONLY valid JSON in this exact format with no extra text:

{{
    "name": "",
    "skills": [],
    "experience": "",
    "education": ""
}}
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
                "experience": "AI API quota exceeded.",
                "education": "",
            }