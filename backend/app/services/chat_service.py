import os
import time
from groq import Groq
from dotenv import load_dotenv

from app.services.rag_service import RAGService
from app.services.vector_store import VectorStoreService

load_dotenv()


class ChatService:

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @staticmethod
    def ask(question: str):

        docs = RAGService.search(question)
        context = ""

        if docs:
            context = "\n\n".join(doc.page_content for doc in docs)
        else:
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
                response = ChatService.client.chat.completions.create(
                    model="llama3-70b-8192",
                    messages=[
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=1024,
                )
                return response.choices[0].message.content

            except Exception as e:
                error = str(e)
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue
                return f"AI Error: {error}"