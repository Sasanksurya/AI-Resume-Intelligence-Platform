import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()


class AIService:

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    @staticmethod
    def generate(prompt: str):

        retries = 3

        for attempt in range(retries):

            try:

                response = AIService.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )

                return response.text

            except Exception as e:

                error = str(e)

                # Retry temporary server errors
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue

                # API quota exceeded
                if "429" in error or "RESOURCE_EXHAUSTED" in error:
                    raise Exception(
                        "Gemini API quota exceeded. Please try again later."
                    )

                # Invalid API Key
                if "401" in error or "API_KEY" in error:
                    raise Exception(
                        "Invalid Gemini API Key."
                    )

                raise Exception(error)