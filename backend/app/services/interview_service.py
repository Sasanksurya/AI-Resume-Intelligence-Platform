import os
import json
import time

from dotenv import load_dotenv
from groq import Groq

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService

load_dotenv()


class InterviewService:

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @staticmethod
    def generate():

        try:
            docs = RAGService.search("resume projects skills experience education")
        except Exception as e:
            return [{"question": "Error", "answer": str(e)}]

        if docs:
            context = "\n\n".join(doc.page_content for doc in docs)
        else:
            context = VectorStoreService.load_resume_text()

        if not context.strip():
            return [{"question": "Error", "answer": "Please upload your resume first."}]

        prompt = f"""
You are an expert technical interviewer.

Using ONLY the resume below, generate 10 interview questions with ideal answers.

Resume:
{context[:6000]}

Return ONLY valid JSON, no extra text:

[
  {{
    "question": "Tell me about yourself.",
    "answer": "..."
  }}
]
"""

        retries = 3

        for attempt in range(retries):
            try:
                response = InterviewService.client.chat.completions.create(
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

            except Exception as e:
                error = str(e)
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue
                return [{"question": "Error", "answer": error}]

        return [{"question": "Error", "answer": "Unknown error."}]