from app.services.embedding_service import EmbeddingService

vector = EmbeddingService.get_embedding("Hello AI")

print(len(vector))