from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService
from app.services.vector_store import VectorStoreService

router = APIRouter()

UPLOAD_FOLDER = Path("/tmp/uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not PDFService.validate_pdf(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = PDFService.extract_text(str(file_path))

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text found in the PDF."
        )

    # Save full text to disk so chat can use it even after memory reset
    VectorStoreService.save_resume_text(extracted_text)

    chunks = ChunkService.create_chunks(extracted_text)
    vector_db = VectorStoreService.create_vector_store(chunks)
    VectorStoreService.save_vector_store(vector_db)

    return {
        "success": True,
        "filename": file.filename,
        "message": "Resume uploaded and indexed successfully.",
        "chunks": len(chunks)
    }