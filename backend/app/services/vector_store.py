from langchain_community.vectorstores import FAISS
from app.services.embedding_service import EmbeddingService


class VectorStoreService:

    @staticmethod
    def create_vector_store(chunks):
        embeddings = EmbeddingService.embeddings
        vector_db = FAISS.from_texts(chunks, embeddings)
        return vector_db

    @staticmethod
    def save_vector_store(vector_db, path="faiss_index"):
        vector_db.save_local(path)

    @staticmethod
    def load_vector_store(path="faiss_index"):
        embeddings = EmbeddingService.embeddings
        return FAISS.load_local(
            path,
            embeddings,
            allow_dangerous_deserialization=True
        )