from app.services.vector_store import VectorStoreService


class RAGService:

    @staticmethod
    def search(query: str, k: int = 4):
        db = VectorStoreService.load_vector_store()

        if db is None:
            return []

        docs = db.similarity_search(query, k=k)
        return docs