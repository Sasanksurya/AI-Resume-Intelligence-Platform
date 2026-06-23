from app.services.rag_service import RAGService

query = "What are the skills?"

docs = RAGService.search(query)

print("=" * 50)

for i, doc in enumerate(docs):
    print(f"\nChunk {i+1}\n")
    print(doc.page_content)