import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css";

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, botTyping]);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setInput("");
    setBotTyping(true);
  
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      
      const response = await axios.post(`${API_URL}/chat`, {
        messages: [...messages, userMessage], // Send correct conversation context
      });
  
      const botReply = response.data.response?.trim() || "I'm here to help!";
  
      simulateTyping(botReply); // Call only once to prevent duplicates
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Oops! Something went wrong. Try again." },
      ]);
      setBotTyping(false);
    }
  };
  

  // Simulate typing effect
  const simulateTyping = (text) => {
    if (!text || typeof text !== "string") return;
  
    let index = 0;
    let newMessage = "";
  
    setMessages((prev) => [...prev, { role: "bot", content: "" }]); // Start with empty message
    setBotTyping(true);
  
    const interval = setInterval(() => {
      if (index < text.length) {
        newMessage += text[index];
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
  
          if (lastMessage && lastMessage.role === "bot") {
            return [...prev.slice(0, -1), { role: "bot", content: newMessage }];
          }
          return prev;
        });
  
        index++;
      } else {
        clearInterval(interval);
        setBotTyping(false);
      }
    }, 50);
  };
  
  

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span role="img" aria-label="Chat Icon">💬</span> Chatbot
      </div>

      {/* Chat Messages */}
      <div ref={chatBoxRef} className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>{" "}
            {msg.content}
          </div>
        ))}
        {botTyping && <div className="typing-animation">...</div>}
      </div>

      {/* Input Box */}
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
