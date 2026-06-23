import fitz  # PyMuPDF
from pathlib import Path


class PDFService:
    """
    Service responsible for extracting text from PDF resumes.
    """

    @staticmethod
    def extract_text(pdf_path: str) -> str:
        """
        Extract text from a PDF file.

        Args:
            pdf_path (str): Path to the uploaded PDF.

        Returns:
            str: Extracted text.
        """

        pdf_file = Path(pdf_path)

        if not pdf_file.exists():
            raise FileNotFoundError(f"File not found: {pdf_path}")

        document = fitz.open(pdf_path)

        extracted_text = ""

        for page in document:
            extracted_text += page.get_text()

        document.close()

        extracted_text = PDFService.clean_text(extracted_text)

        return extracted_text

    @staticmethod
    def clean_text(text: str) -> str:
        """
        Clean extracted PDF text.
        """

        text = text.replace("\n", " ")
        text = text.replace("\t", " ")
        text = " ".join(text.split())

        return text

    @staticmethod
    def validate_pdf(file_name: str) -> bool:
        """
        Validate uploaded file extension.
        """

        return file_name.lower().endswith(".pdf")