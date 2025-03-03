import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch the API key
API_KEY = os.getenv("RAG_KEY")

if API_KEY:
    print("API Key Loaded Successfully", API_KEY)
else:
    print("Error: API Key is not set!")
