from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService
from app.services.vector_store import VectorStoreService

router = APIRouter()

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload resume, extract text, create embeddings,
    create FAISS index and save it.
    """

    # Validate PDF
    if not PDFService.validate_pdf(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOAD_FOLDER / file.filename

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = PDFService.extract_text(str(file_path))

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text found in the PDF."
        )

    # Create chunks
    chunks = ChunkService.create_chunks(extracted_text)

    # Create FAISS vector database
    vector_db = VectorStoreService.create_vector_store(chunks)

    # Save FAISS index
    VectorStoreService.save_vector_store(vector_db)

    return {
        "success": True,
        "filename": file.filename,
        "message": "Resume uploaded and indexed successfully.",
        "chunks": len(chunks)
    }