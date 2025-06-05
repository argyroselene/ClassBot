import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-2xl w-full text-center">
        <div className="mb-6">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-2">🎓 ClassBot</h1>
          <p className="text-gray-600 text-lg">Your AI-powered classroom assistant</p>
        </div>

        {/* Optional Mascot Illustration */}
        <div className="mb-6">
          <img
            src="https://undraw.co/api/illustrations/35d9d1b3-c239-44ad-98cb-4970c3245dfd"
            alt="Classroom mascot"
            className="mx-auto w-48 h-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow"
          >
            🔐 Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow"
          >
            ✍️ Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
