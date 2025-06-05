import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewMyClasses({ role }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/api/classes/${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [role]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📂 My Classes</h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <ul className="space-y-2">
          {classes.map((cls) => (
            <li key={cls._id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{cls.name}</h3>
              <p>{cls.description}</p>
              {role === "teacher" && <p>🔑 Code: {cls.code}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
