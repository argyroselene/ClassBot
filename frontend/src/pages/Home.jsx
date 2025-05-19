import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-10">Welcome to ClassBot</h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
