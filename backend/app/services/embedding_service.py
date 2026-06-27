from langchain_huggingface import HuggingFaceEmbeddings


class EmbeddingService:

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    @staticmethod
    def create_embeddings(chunks):
        return EmbeddingService.embeddings.embed_documents(chunks)

    @staticmethod
    def get_embedding(text):
        return EmbeddingService.embeddings.embed_query(text)