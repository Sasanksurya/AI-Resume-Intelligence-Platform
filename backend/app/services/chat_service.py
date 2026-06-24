import os
from dotenv import load_dotenv
from google import genai

from app.services.rag_service import RAGService

load_dotenv()


class ChatService:

    # Create Gemini client
    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def ask(question: str):
        # Search relevant resume chunks
        docs = RAGService.search(question)

        # If no documents are found
        if not docs:
            return "No resume has been uploaded or no relevant information was found."

        # Combine retrieved chunks
        context = "\n\n".join(doc.page_content for doc in docs)

        # Prompt for Gemini
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

        try:
            # Generate response
            response = ChatService.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return response.text

        except Exception as e:
            return f"Gemini API Error: {str(e)}"