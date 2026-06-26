import json
import time

from app.services.ai_service import AIService
from app.services.rag_service import RAGService


class ImproveService:

    @staticmethod
    def improve():

        try:
            docs = RAGService.search("resume experience projects skills education")

            if not docs:
                return {
                    "improved_summary": "",
                    "improved_experience": [],
                    "improved_projects": [],
                    "tips": [
                        "No resume uploaded."
                    ]
                }

            context = "\n\n".join(doc.page_content for doc in docs)

            prompt = f"""
You are an expert Resume Writer.

Improve the resume below.

Resume:

{context}

Return ONLY valid JSON.

{{
    "improved_summary":"",

    "improved_experience":[
        "...",
        "..."
    ],

    "improved_projects":[
        "...",
        "..."
    ],

    "tips":[
        "...",
        "...",
        "..."
    ]
}}
"""

            retries = 3

            for attempt in range(retries):

                try:

                    response = AIService.generate(prompt)

                    text = response.strip()

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
                "tips": [
                    str(e)
                ]
            }