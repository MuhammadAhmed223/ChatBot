import os
import openai
from dotenv import load_dotenv

def load_api_key():
    """Loads the API key from environment variables."""
    load_dotenv()
    return os.getenv("RAG_KEY")

def get_chat_response(messages):
    """Sends user messages to the chatbot API and returns the response."""
    api_key = load_api_key()
    if not api_key:
        raise ValueError("API key not found. Make sure to set RAG_KEY in your .env file.")
    
    client = openai.OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key
    )
    
    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-chat:free",
            messages=messages,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    print("Chatbot is running. Type 'exit' to quit.")
    messages = []
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        messages.append({"role": "user", "content": user_input})
        response = get_chat_response(messages)
        messages.append({"role": "assistant", "content": response})
        print(f"Bot: {response}")
