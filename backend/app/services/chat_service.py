import os
import time

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService

load_dotenv()


class ChatService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def ask(question: str):

        # Try FAISS first
        docs = RAGService.search(question)
        context = ""

        if docs:
            context = "\n\n".join(doc.page_content for doc in docs)
        else:
            # Fallback: use full resume text saved on disk
            context = VectorStoreService.load_resume_text()

        if not context.strip():
            return "Please upload your resume first before asking questions."

        prompt = f"""
You are an AI Resume Assistant.

Answer ONLY using the information provided in the resume below.

Resume:
{context}

Question:
{question}

Rules:
1. Answer only from the resume content above.
2. If the answer is not in the resume, say: "I couldn't find that information in the resume."
3. Do not make up any information.
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