from langchain_text_splitters import RecursiveCharacterTextSplitter


class ChunkService:
    """
    Service for splitting extracted resume text into chunks.
    """

    @staticmethod
    def create_chunks(text: str):
        """
        Split resume text into smaller overlapping chunks.
        """

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100,
            separators=["\n\n", "\n", ".", " ", ""]
        )

        chunks = splitter.split_text(text)

        return chunks