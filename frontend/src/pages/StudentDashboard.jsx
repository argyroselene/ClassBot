import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [noteFile, setNoteFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [classCode, setClassCode] = useState("");
  const [joinStatus, setJoinStatus] = useState("");
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching student data:", err));

    fetchJoinedClasses();
  }, []);

  const fetchJoinedClasses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/classes/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoinedClasses(res.data);
    } catch (err) {
      console.error("Error fetching joined classes:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const handleUpload = async () => {
    if (!noteFile) return;

    const formData = new FormData();
    formData.append("note", noteFile);

    try {
      const res = await axios.post("http://localhost:5000/api/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("✅ Upload successful!");
    } catch (err) {
      setUploadStatus("❌ Upload failed");
      console.error("Upload failed:", err);
    }
  };

  const handleJoinClass = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/classes/join",
        { code: classCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJoinStatus(`✅ Joined class: ${res.data.class.name}`);
      setClassCode("");
      fetchJoinedClasses(); // refresh list
    } catch (err) {
      console.error("Join class failed:", err);
      const msg = err.response?.data?.message || "❌ Failed to join class";
      setJoinStatus(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🎓 Welcome{user?.name ? `, ${user.name}` : ""}!
        </h1>

        {user ? (
          <div className="text-gray-700 mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Loading your dashboard...</p>
        )}

        {/* Upload Notes */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📝 Upload Notes</h2>
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={(e) => setNoteFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
          {uploadStatus && <p className="mt-2 text-green-600">{uploadStatus}</p>}
        </div>

        {/* Join Class */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🔑 Join a Class</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter class code"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleJoinClass}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Join
            </button>
          </div>
          {joinStatus && <p className="mt-2 text-blue-600">{joinStatus}</p>}
        </div>

        {/* Joined Classes */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📚 Joined Classes</h2>
          {joinedClasses.length === 0 ? (
            <p className="text-gray-500">No classes joined yet.</p>
          ) : (
            <ul className="space-y-3">
              {joinedClasses.map((cls) => (
                <li key={cls._id} className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{cls.name}</h3>
                  <p className="text-sm text-gray-600">{cls.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Code: {cls.code}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = "/student-chatbot"}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            🤖 Open StudyBot Chat
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}



