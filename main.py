import os
import streamlit as st
import openai
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()
api_key = os.getenv("RAG_KEY")

# Initialize OpenAI client
client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

# Streamlit page configuration
st.set_page_config(page_title="AI Chatbot 🤖", layout="wide")

# Custom CSS for better UI & animations
st.markdown(
    """
    <style>
        body {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .stApp {
            background-color: #1e1e1e;
        }
        .chat-container {
            max-height: 500px;
            overflow-y: auto;
        }
        .message {
            border-radius: 12px;
            padding: 12px 15px;
            margin: 8px 0;
            max-width: 80%;
            font-size: 16px;
            line-height: 1.5;
            animation: fadeIn 0.5s ease-in-out;
        }
        .user {
            background-color: #0078ff;
            color: white;
            align-self: flex-end;
            text-align: right;
            font-size: 18px;
            padding: 14px;
        }
        .assistant {
            background-color: #2a2a2a;
            color: #ffffff;
            align-self: flex-start;
            text-align: left;
            font-size: 18px;
            padding: 14px;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
    """,
    unsafe_allow_html=True
)

# Title & description
st.markdown("<h1 style='text-align: center;'>🤖 AI Chatbot</h1>", unsafe_allow_html=True)
st.write("A modern chatbot powered by **DeepSeek** on **OpenRouter API**")

# Chat history
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# Display chat history dynamically
chat_container = st.container()
with chat_container:
    for message in st.session_state["messages"]:
        role_class = "user" if message["role"] == "user" else "assistant"
        st.markdown(f"<div class='message {role_class}'>{message['content']}</div>", unsafe_allow_html=True)

# User input field with submit button
user_input = st.text_input("Type your message here...", key="user_input")
send_button = st.button("Send")

if send_button and user_input:
    # Add user message to chat history
    st.session_state["messages"].append({"role": "user", "content": user_input})
    
    with chat_container:
        st.markdown(f"<div class='message user'>{user_input}</div>", unsafe_allow_html=True)
    
    # Show loading animation
    with st.spinner("Thinking..."):
        time.sleep(1)  # Simulating response time
        try:
            response = client.chat.completions.create(
                model="deepseek/deepseek-chat:free",
                messages=st.session_state["messages"],
                temperature=0.7
            )
            bot_response = response.choices[0].message.content.strip()
            
            # Store assistant response
            st.session_state["messages"].append({"role": "assistant", "content": bot_response})
            
            with chat_container:
                st.markdown(f"<div class='message assistant'>{bot_response}</div>", unsafe_allow_html=True)
        except Exception as e:
            st.error(f"Error: {str(e)}")
    
    # Clear input field after sending by reloading the page
    st.rerun()
