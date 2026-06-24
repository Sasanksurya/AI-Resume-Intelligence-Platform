import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

print("GOOGLE_API_KEY =", os.getenv("GOOGLE_API_KEY"))

class EmbeddingService:

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
    )

    @staticmethod
    def create_embeddings(chunks):
        return EmbeddingService.embeddings.embed_documents(chunks)

    @staticmethod
    def get_embedding(text):
        return EmbeddingService.embeddings.embed_query(text)