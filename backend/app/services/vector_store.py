from langchain_community.vectorstores import FAISS
from app.services.embedding_service import EmbeddingService


class VectorStoreService:

    # In-memory store — persists as long as server is running
    _vector_db = None

    @staticmethod
    def create_vector_store(chunks):
        embeddings = EmbeddingService.embeddings
        vector_db = FAISS.from_texts(chunks, embeddings)
        return vector_db

    @staticmethod
    def save_vector_store(vector_db, path="faiss_index"):
        # Save to disk AND keep in memory
        VectorStoreService._vector_db = vector_db
        try:
            vector_db.save_local(path)
        except Exception:
            pass  # Disk save may fail on Render, memory is enough

    @staticmethod
    def load_vector_store(path="faiss_index"):
        # Try memory first
        if VectorStoreService._vector_db is not None:
            return VectorStoreService._vector_db

        # Try disk as fallback
        try:
            embeddings = EmbeddingService.embeddings
            db = FAISS.load_local(
                path,
                embeddings,
                allow_dangerous_deserialization=True
            )
            VectorStoreService._vector_db = db
            return db
        except Exception:
            return None