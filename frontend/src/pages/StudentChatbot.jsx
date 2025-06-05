import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentChatbot() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate(); // <-- hook for navigation

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: "student", text: chatInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: chatInput,
      });

      const aiMessage = { sender: "ai", text: res.data.reply };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const aiError = { sender: "ai", text: "Something went wrong. Please try again later." };
      setChatHistory((prev) => [...prev, aiError]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Ask StudyBot 🤖</h1>

        <div className="h-64 overflow-y-auto border p-3 mb-4 bg-gray-50 rounded">
          {chatHistory.length === 0 && <p className="text-gray-400">Start asking a question...</p>}
          {chatHistory.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <strong className={msg.sender === "ai" ? "text-blue-700" : "text-gray-800"}>
                {msg.sender === "ai" ? "AI:" : "You:"}
              </strong>{" "}
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask a question about your notes..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/student-dashboard")}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

