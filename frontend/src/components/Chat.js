import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    const updatedHistory = [...chatHistory, userMessage];

    setChatHistory(updatedHistory);
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        messages: updatedHistory,
      });

      const botMessage = { role: "assistant", content: res.data.message };
      setChatHistory([...updatedHistory, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Chatbot</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "5px" }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default Chat;
