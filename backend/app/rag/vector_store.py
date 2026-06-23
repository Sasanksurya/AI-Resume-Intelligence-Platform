from langchain_community.vectorstores import FAISS

from app.rag.embeddings import get_embeddings


def create_vector_store(chunks):
    """
    Create a FAISS vector database from text chunks.
    """

    embeddings = get_embeddings()

    vector_db = FAISS.from_texts(
        texts=chunks,
        embedding=embeddings,
    )

    vector_db.save_local("vector_db")

    return vector_db