from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings import TfidfEmbeddings


class EmbeddingService:

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )

    @staticmethod
    def create_embeddings(chunks):
        return EmbeddingService.embeddings.embed_documents(chunks)

    @staticmethod
    def get_embedding(text):
        return EmbeddingService.embeddings.embed_query(text)
