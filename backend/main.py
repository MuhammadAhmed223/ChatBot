from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()
api_key = os.getenv("RAG_KEY")

# Initialize OpenAI Client
client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

# Initialize FastAPI App
app = FastAPI()

# Enable CORS (Frontend <-> Backend Communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Body Format
class ChatRequest(BaseModel):
    messages: list

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print("Received messages:", request.messages)  # Debugging
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct",  # Best model for conversation
            messages=request.messages,
            temperature=0.7
        )
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}

