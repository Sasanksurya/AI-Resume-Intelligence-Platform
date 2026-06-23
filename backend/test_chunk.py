from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService

text = PDFService.extract_text(
    "uploads/Sasank_Surya_Thota_IT_Support_Engineer_Trainee_Resume.pdf"
)

chunks = ChunkService.create_chunks(text)

print(f"Total Chunks: {len(chunks)}")

for i, chunk in enumerate(chunks):
    print(f"\nChunk {i+1}")
    print(chunk[:200])