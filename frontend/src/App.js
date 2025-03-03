import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [startChat, setStartChat] = useState(false);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      {!startChat ? (
        <button onClick={() => setStartChat(true)} className="btn btn-primary btn-lg">
          Get Started
        </button>
      ) : (
        <Chatbot />
      )}
    </div>
  );
}

export default App;
