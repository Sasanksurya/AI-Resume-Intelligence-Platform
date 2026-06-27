from langchain.embeddings.base import Embeddings
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import List
import numpy as np


class SklearnEmbeddings(Embeddings):

    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=384)
        self._fitted = False
        self._fit_texts = []

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        self._fit_texts.extend(texts)
        self.vectorizer.fit(self._fit_texts)
        self._fitted = True
        matrix = self.vectorizer.transform(texts).toarray()
        return matrix.tolist()

    def embed_query(self, text: str) -> List[float]:
        if not self._fitted:
            self.vectorizer.fit([text])
            self._fitted = True
        vec = self.vectorizer.transform([text]).toarray()
        return vec[0].tolist()


class EmbeddingService:

    embeddings = SklearnEmbeddings()

    @staticmethod
    def create_embeddings(chunks):
        return EmbeddingService.embeddings.embed_documents(chunks)

    @staticmethod
    def get_embedding(text):
        return EmbeddingService.embeddings.embed_query(text)