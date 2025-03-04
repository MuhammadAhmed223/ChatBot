import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Choose any style you like

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

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // Format messages with basic Markdown support
  // Updated formatMessage function
  const formatMessage = (text) => {
    // Convert Markdown-style headings
    text = text.replace(/^### (.*$)/gm, '<h3 class="markdown-heading">$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2 class="markdown-heading">$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1 class="markdown-heading">$1</h1>');

    // Convert inline code (`code`)
    text = text.replace(/`([^`]+)`/g, `<code class="inline-code">$1</code>`);

    // Convert code blocks (```js ... ```)
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const highlightedCode = hljs.highlightAuto(code).value;
      return `<div class="code-container">
              <pre><code class="hljs">${highlightedCode}</code></pre>
              <button class="copy-btn" onclick="navigator.clipboard.writeText(\`${code}\`)">Copy</button>
            </div>`;
    });

    return text;
  };


  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        messages: [...messages, userMessage], // Send full conversation context
      });

      const botReply = response.data.response?.trim() || "I'm here to help!";

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
            <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
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
