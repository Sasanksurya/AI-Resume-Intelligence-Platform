import os
from langchain_community.vectorstores import FAISS
from app.services.embedding_service import EmbeddingService

RESUME_TEXT_PATH = "/tmp/resume_text.txt"


class VectorStoreService:

    _vector_db = None

    @staticmethod
    def create_vector_store(chunks):
        embeddings = EmbeddingService.embeddings
        vector_db = FAISS.from_texts(chunks, embeddings)
        VectorStoreService._vector_db = vector_db
        return vector_db

    @staticmethod
    def save_vector_store(vector_db, path="faiss_index"):
        VectorStoreService._vector_db = vector_db
        try:
            vector_db.save_local(path)
        except Exception:
            pass

    @staticmethod
    def load_vector_store(path="faiss_index"):
        if VectorStoreService._vector_db is not None:
            return VectorStoreService._vector_db
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

    @staticmethod
    def save_resume_text(text: str):
        with open(RESUME_TEXT_PATH, "w", encoding="utf-8") as f:
            f.write(text)

    @staticmethod
    def load_resume_text() -> str:
        if not os.path.exists(RESUME_TEXT_PATH):
            return ""
        with open(RESUME_TEXT_PATH, "r", encoding="utf-8") as f:
            return f.read()