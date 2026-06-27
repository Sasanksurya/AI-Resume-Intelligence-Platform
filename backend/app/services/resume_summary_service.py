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
                model="llama3-70b-8192",
                messages=[
                    {"role": "user", "content": prompt}
                ],
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
                "experience": "AI API error.",
                "education": "Not Found",
            }