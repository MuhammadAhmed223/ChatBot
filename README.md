# 🤖 AI Chatbot

### Built by Muhammad Ahmed ✨  
A modern and interactive AI chatbot designed for intelligent conversations, featuring an attractive UI and smooth performance.

---

## 🚀 Features

✅ **Smart Conversations** – Provides intelligent and contextual responses using Generative AI.  
🎨 **Modern UI** – Smooth animations, clean message bubbles, and a user-friendly interface.  
⚡ **Fast Performance** – Optimized for real-time interactions.  
🛠 **Full-Stack Implementation** – Built with **FastAPI (backend)** and **React.js (frontend)**.  
📄 **Code Formatting & Copy Button** – Supports syntax highlighting for code blocks.  
📜 **Copy Entire Chat** – Allows users to copy the conversation with a single click.  
🔮 **Future-Ready** – Easily extendable for more features like voice input, multi-language support, and more.  

---

## 🏗️ Tech Stack

| Technology  | Purpose  |
|-------------|----------|
| **FastAPI**  | Backend API for handling chatbot logic |
| **React.js**  | Frontend UI for interactive chat interface |
| **Axios**  | HTTP requests from frontend to backend |
| **OpenRouter API**  | Generates chatbot responses using DeepSeek model |
| **Highlight.js**  | Syntax highlighting for code snippets |
| **CSS Animations**  | Smooth transitions and effects |
| **VS Code**  | Development environment |

---

## 🏛️ Architecture

The chatbot follows a **client-server architecture** where:

1️⃣ **Frontend (React.js)** – Handles the user interface, message animations, and user interactions.  
2️⃣ **Backend (FastAPI)** – Processes user messages, interacts with the AI model, and returns intelligent responses.  
3️⃣ **AI Model (OpenRouter API with DeepSeek)** – Generates responses based on user input.  

### **High-Level Flow**  
📩 **User Input → React.js → FastAPI → OpenRouter API → Response → React.js UI** 🎤  

---

## 📂 Project Structure

```plaintext
ChatBot/
│── backend/                # FastAPI backend
│   ├── main.py             # Main API logic
│   ├── requirements.txt    # Backend dependencies
│   ├── .env                # API key configuration
│
│── frontend/               # React.js frontend
│   ├── src/                # React source files
│   │   ├── components/     # UI components
│   │   ├── App.js          # Main chatbot UI logic
│   │   ├── index.js        # Entry point for React
│   │   ├── styles.css      # Styling for chatbot UI
│   │
│   ├── public/             # Static assets
│   │   ├── index.html      # Main HTML file
│   │
│   ├── package.json        # Frontend dependencies
│   ├── .env                # API url
├── .gitignore              # Git ignore file
├── LICENSE                 # Project license
└── README.md               # Project documentation
```

---

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/MuhammadAhmed223/ChatBot.git
cd ChatBot
```

### 2️⃣ Install Dependencies

#### Backend (FastAPI)
```sh
cd backend
pip install -r requirements.txt
```

#### Frontend (React.js)
```sh
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **backend** directory and add your API key:
```sh
RAG_KEY=your_api_key_here
```

### 4️⃣ Run the Chatbot

#### Start the Backend (FastAPI)
```sh
cd backend
uvicorn main:app --reload
```

#### Start the Frontend (React.js)
```sh
cd frontend
npm start
```

---

## 🖥️ **Chat UI Features**

✅ **User Messages on the Right** – Styled similar to ChatGPT.  
✅ **Bot Messages with Smooth Pop-Up Animation** – Messages appear dynamically.  
✅ **Typewriter Effect for Responses** – Gradually reveals bot messages for a natural feel.  
✅ **Code Blocks with Syntax Highlighting** – Supports multiple programming languages.  
✅ **Copy Button for Code & Entire Chat** – Makes it easy to reuse information.  

---

## 🔮 Future Enhancements

🌎 **Multi-Language Support** – Enable conversations in multiple languages.  
🗂 **Persistent Chat History** – Save and reload past conversations.  
🎙 **Voice Input & Output** – Add speech-to-text and text-to-speech capabilities.  
📱 **Mobile-Friendly UI** – Ensure seamless experience on all devices.  

---

## 🤝 Contributing

Contributions are welcome! If you’d like to improve the chatbot, feel free to:

1️⃣ Fork the repository.  
2️⃣ Create a new feature branch.  
3️⃣ Submit a pull request with your changes.  

Let's build something amazing together! 🚀  

---

## 📜 License

This project is licensed under the **MIT License**.  

💡 *Developed with passion by Muhammad Ahmed* 💙  

---

### 🔗 [GitHub Repository](https://github.com/MuhammadAhmed223/ChatBot)

