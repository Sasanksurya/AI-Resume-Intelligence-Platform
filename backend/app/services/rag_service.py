from langchain_community.vectorstores import FAISS
from app.services.embedding_service import EmbeddingService


class RAGService:

    @staticmethod
    def search(query: str, k: int = 4):
        db = FAISS.load_local(
            "faiss_index",
            EmbeddingService.embeddings,
            allow_dangerous_deserialization=True,
        )

        docs = db.similarity_search(query, k=k)

        return docs