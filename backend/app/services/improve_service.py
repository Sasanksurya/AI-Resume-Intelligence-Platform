import json
import time

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService
from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


class ImproveService:

    @staticmethod
    def improve():

        try:
            docs = RAGService.search("resume experience projects skills education")

            if docs:
                context = "\n\n".join(doc.page_content for doc in docs)
            else:
                context = VectorStoreService.load_resume_text()

            if not context.strip():
                return {
                    "improved_summary": "",
                    "improved_experience": [],
                    "improved_projects": [],
                    "tips": ["Please upload your resume first."]
                }

            prompt = f"""
You are an expert Resume Writer.

Improve the resume below.

Resume:
{context[:6000]}

Return ONLY valid JSON, no extra text:

{{
    "improved_summary": "",
    "improved_experience": ["...", "..."],
    "improved_projects": ["...", "..."],
    "tips": ["...", "...", "..."]
}}
"""

            retries = 3

            for attempt in range(retries):
                try:
                    response = client.chat.completions.create(
                        model="llama3-70b-8192",
                        messages=[{"role": "user", "content": prompt}],
                        max_tokens=2048,
                    )

                    text = response.choices[0].message.content.strip()

                    if text.startswith("```json"):
                        text = text.replace("```json", "").replace("```", "").strip()
                    elif text.startswith("```"):
                        text = text.replace("```", "").strip()

                    return json.loads(text)

                except Exception:
                    if attempt < retries - 1:
                        time.sleep(3)
                        continue
                    raise

        except Exception as e:
            return {
                "improved_summary": "",
                "improved_experience": [],
                "improved_projects": [],
                "tips": [str(e)]
            }