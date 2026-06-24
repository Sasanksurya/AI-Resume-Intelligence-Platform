import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

Client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

print("Connection successful!")

for model in client.models.list():
    print(model.name)