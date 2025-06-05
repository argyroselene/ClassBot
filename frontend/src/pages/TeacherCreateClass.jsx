import { useState } from "react";
import axios from "axios";

export default function TeacherCreateClass() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:5000/api/classes", {
        name,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(`✅ Class created! Code: ${res.data.code}`);
    } catch (err) {
      setMessage("❌ Failed to create class");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">📚 Create a Class</h2>
      <input
        type="text"
        placeholder="Class name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Create Class
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
