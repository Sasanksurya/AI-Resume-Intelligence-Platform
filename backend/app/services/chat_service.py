import os
from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService

load_dotenv()


class ChatService:

    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    @staticmethod
    def ask(question: str):

        docs = RAGService.search(question)

        context = "\n\n".join([doc.page_content for doc in docs])

        prompt = f"""
You are an AI Resume Assistant.

Answer ONLY using the resume information below.

Resume:
{context}

Question:
{question}

If the answer is not present in the resume, reply:
"I couldn't find that information in the resume."
"""

        response = ChatService.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return response.text