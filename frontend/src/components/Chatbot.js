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

  // ✅ Fix: Vite Compatibility for API URL
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    // ✅ Fix: Ensure messages state updates correctly
    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      return newMessages;
    });

    setInput("");
    setBotTyping(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        messages: [...messages, userMessage], // Send full conversation context
      });

      const botReply = response.data.response?.trim() || "I'm here to help!";

      // ✅ Fix: Add small delay to bot typing for a smoother effect
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
        setBotTyping(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Oops! Something went wrong. Try again." },
      ]);
      setBotTyping(false);
    }
  };

  // Copy Chat
  const copyChat = () => {
    const chatText = messages
      .map((msg) => `${msg.role === "user" ? "You" : "Bot"}: ${msg.content}`)
      .join("\n");
    navigator.clipboard.writeText(chatText);
    alert("Chat copied!");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span role="img" aria-label="chat">💬</span> Chatbot
      </div>

      {/* Chat Messages */}
      <div ref={chatBoxRef} className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === "bot" && <h5 className="bot-heading">Chatbot Response:</h5>}
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

      {/* Copy Chat Button */}
      <button className="copy-chat-btn" onClick={copyChat}>
        <span role="img" aria-label="copy">📜</span> Copy Chat
      </button>
    </div>
  );
}

export default Chatbot;
