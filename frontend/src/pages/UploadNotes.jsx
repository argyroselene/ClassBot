// frontend/src/pages/UploadNotes.jsx
import { useState } from "react";
import axios from "axios";

export default function UploadNotes() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("note", file);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:5000/api/notes/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Upload successful!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4 font-bold">Upload Class Notes</h2>
      <input type="file" onChange={handleChange} accept=".pdf, image/*" />
      <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}
