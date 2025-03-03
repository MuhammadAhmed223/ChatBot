import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css"; // Ensure this contains the latest styles

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);
  
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        messages: [...messages, userMessage],
      });
  
      let botReply = response.data.response;
      
      // Ensure the response is a valid string
      if (!botReply || typeof botReply !== "string") {
        botReply = "I'm here to help!";
      }
  
      simulateTyping(botReply.trim());  // Trim to avoid extra spaces or "undefined"
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
    if (!text || typeof text !== "string") return;  // Prevent undefined input
    let index = 0;
    setBotTyping(true);
  
    const interval = setInterval(() => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
  
        if (lastMessage && lastMessage.role === "bot") {
          return [
            ...prev.slice(0, -1),
            { role: "bot", content: lastMessage.content + text[index] },
          ];
        } else {
          return [...prev, { role: "bot", content: text[index] }];
        }
      });
  
      index++;
      if (index >= text.length) {
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
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
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
