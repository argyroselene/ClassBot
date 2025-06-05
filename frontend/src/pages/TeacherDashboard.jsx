import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherDashboard() {
  const [userName, setUserName] = useState("Professor Chalkboard");
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "teacher") {
      window.location.href = "/login";
      return;
    }

    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/classes/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (err) {
      console.error("Failed to fetch classes", err);
    }
  };

  const handleCreateClass = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/classes",
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(`✅ Class "${res.data.name}" created! Code: ${res.data.code}`);
      setName("");
      setDescription("");
      fetchClasses();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create class");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            👨‍🏫 Welcome, {userName}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Class Creation */}
          <div>
            <h2 className="text-xl font-semibold mb-2">📚 Create a New Class</h2>
            <input
              type="text"
              placeholder="Class Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Class Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <button
              onClick={handleCreateClass}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Create Class
            </button>
            {message && <p className="mt-2 text-green-600">{message}</p>}
          </div>

          {/* Class List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">📖 Your Classes</h2>
            {classes.length === 0 ? (
              <p className="text-gray-500">No classes created yet.</p>
            ) : (
              <ul className="space-y-4">
                {classes.map((cls) => (
                  <li
                    key={cls._id}
                    className="border p-4 rounded shadow-sm bg-gray-50"
                  >
                    <h3 className="font-bold text-lg">{cls.name}</h3>
                    <p className="text-sm text-gray-600">{cls.description}</p>
                    <p className="text-sm mt-2">
                      🔑 <span className="font-mono">{cls.code}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
