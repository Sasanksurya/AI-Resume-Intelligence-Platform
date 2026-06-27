import json

from app.services.rag_service import RAGService
from app.services.ai_service import AIService
from app.services.vector_store import VectorStoreService


class ResumeSummaryService:

    @staticmethod
    def generate_summary():

        # Use full resume text directly for better name extraction
        full_text = VectorStoreService.load_resume_text()

        if not full_text.strip():
            # Fallback to RAG search
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

            full_text = "\n\n".join(doc.page_content for doc in all_docs)

        # Use first 3000 characters — name is always near the top
        top_section = full_text[:3000]

        prompt = f"""
You are an AI Resume Parser.

Extract the following from this resume text.

Resume (first section):
{top_section}

Full Resume:
{full_text[:6000]}

Important instructions:
- "name": The person's full name. It is the VERY FIRST line or the largest text at the top of the resume. Look at the absolute beginning of the text.
- "skills": All technical skills, tools, programming languages mentioned anywhere.
- "experience": All work experience and internships with company names and dates.
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
            response = AIService.generate(prompt)

            if response.startswith("```json"):
                response = response.replace("```json", "").replace("```", "").strip()
            elif response.startswith("```"):
                response = response.replace("```", "").strip()

            return json.loads(response)

        except Exception as e:
            return {
                "name": "Not Found",
                "skills": [],
                "experience": "AI API error.",
                "education": "",
            }