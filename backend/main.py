import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()
api_key = os.getenv("RAG_KEY")

if not api_key:
    raise ValueError("❌ ERROR: API Key is missing from .env file")

# Initialize FastAPI App
app = FastAPI()

# Enable CORS (Frontend <-> Backend Communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Body Format
class ChatRequest(BaseModel):
    messages: list

# Define headers with API key
HEADERS = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        payload = {
            "model": "deepseek/deepseek-chat:free",
            "messages": request.messages,
            "temperature": 0.7
        }
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", 
                                 headers=HEADERS, json=payload)
        response_json = response.json()

        if response.status_code == 401:
            return {"error": "Unauthorized. Check API Key."}

        return {"response": response_json["choices"][0]["message"]["content"].strip()}
    
    except Exception as e:
        return {"error": str(e)}

print(f"🔑 API Key Loaded: {api_key}")
