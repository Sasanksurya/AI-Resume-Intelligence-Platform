from langchain_community.vectorstores import FAISS
from app.rag.embeddings import get_embeddings


def get_retriever():
    embeddings = get_embeddings()

    db = FAISS.load_local(
        "vector_db",
        embeddings,
        allow_dangerous_deserialization=True
    )

    return db.as_retriever(search_kwargs={"k": 3})