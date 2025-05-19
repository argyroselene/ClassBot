import React, { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Ideally, decode the JWT to get user info or fetch from API
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Example: Just show a placeholder name for now
    setUserName("Teacher");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Welcome, {userName}!</h1>

        <p className="mb-4">
          This is your teacher dashboard. You can add features here like managing classes,
          creating quizzes, reviewing students’ progress, etc.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
