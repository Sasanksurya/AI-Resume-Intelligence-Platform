import os
import time

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService

load_dotenv()


class ChatService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def ask(question: str):

        docs = RAGService.search(question)

        if not docs:
            return "No relevant resume information found."

        context = "\n\n".join(doc.page_content for doc in docs)

        prompt = f"""
You are an AI Resume Assistant.

Answer ONLY using the information provided in the resume.

Resume:
{context}

Question:
{question}

Rules:
1. Answer only from the resume.
2. If the answer is not present in the resume, reply exactly:
"I couldn't find that information in the resume."
3. Do not make up information.
"""

        retries = 3

        for attempt in range(retries):
            try:
                response = ChatService.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )

                return response.text

            except Exception as e:

                error = str(e)

                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue

                return f"Gemini API Error: {error}"