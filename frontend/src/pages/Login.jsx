import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);  // <--- use res.data.role here

    // Redirect based on role
    if (res.data.role === "teacher") {
      window.location.href = "/teacher-dashboard";
    } else {
      window.location.href = "/student-dashboard";
    }
  } catch (err) {
  console.log('Login error response:', err.response);
  setError(err.response?.data?.error || "Login failed");
}

};


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}