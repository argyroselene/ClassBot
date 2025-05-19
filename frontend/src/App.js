import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Home />} /> {/* homepage */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* add other routes */}
      </Routes>
    </Router>
  );
}

export default App;



