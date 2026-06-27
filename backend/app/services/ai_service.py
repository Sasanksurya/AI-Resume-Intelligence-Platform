import os
import time
from groq import Groq
from dotenv import load_dotenv

load_dotenv()


class AIService:

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @staticmethod
    def generate(prompt: str):

        retries = 3

        for attempt in range(retries):
            try:
                response = AIService.client.chat.completions.create(
                    model="llama3-70b-8192",
                    messages=[
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=2048,
                )
                return response.choices[0].message.content

            except Exception as e:
                error = str(e)
                if "503" in error and attempt < retries - 1:
                    time.sleep(5)
                    continue
                raise Exception(error)