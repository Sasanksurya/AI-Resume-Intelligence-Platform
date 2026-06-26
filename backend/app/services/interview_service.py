import os
import json
import time

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService

load_dotenv()


class InterviewService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def generate():

        try:
            docs = RAGService.search("resume projects skills experience education")

        except Exception as e:
            return [
                {
                    "question": "Error",
                    "answer": str(e)
                }
            ]

        if not docs:
            return [
                {
                    "question": "Error",
                    "answer": "No resume uploaded."
                }
            ]

        context = "\n\n".join(doc.page_content for doc in docs)

        prompt = f"""
You are an expert technical interviewer.

Using ONLY the resume below, generate 10 interview questions.

For every question provide an ideal answer.

Resume:

{context}

Return ONLY valid JSON.

Example:

[
  {{
    "question":"Tell me about yourself.",
    "answer":"..."
  }},
  {{
    "question":"Explain your AI Resume Intelligence Platform.",
    "answer":"..."
  }}
]
"""

        retries = 3

        for attempt in range(retries):

            try:

                response = InterviewService.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "").replace("```", "").strip()

                elif text.startswith("```"):
                    text = text.replace("```", "").strip()

                return json.loads(text)

            except Exception as e:

                error = str(e)

                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue

                return [
                    {
                        "question": "Error",
                        "answer": error
                    }
                ]

        return [
            {
                "question": "Error",
                "answer": "Unknown error."
            }
        ]