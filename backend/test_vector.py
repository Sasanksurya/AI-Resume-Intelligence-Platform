from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService
from app.services.vector_store import VectorStoreService

text = PDFService.extract_text(
    "uploads/Sasank_Surya_Thota_IQVIA_Software_Development_Engineer_1_Resume.pdf"
)

chunks = ChunkService.create_chunks(text)

db = VectorStoreService.create_vector_store(chunks)

VectorStoreService.save_vector_store(db)

print("✅ Vector Store Created Successfully")