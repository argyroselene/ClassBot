import { useState } from "react";
import axios from "axios";

export default function StudentJoinClass() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleJoin = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:5000/api/classes/join", {
        code
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(`✅ Joined class: ${res.data.class.name}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to join class");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🔑 Join a Class</h2>
      <input
        type="text"
        placeholder="Enter class code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleJoin}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Join Class
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
