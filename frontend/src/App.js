import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentChatbot from "./pages/StudentChatbot";
import TeacherCreateClass from "./pages/TeacherCreateClass";
import StudentJoinClass from "./pages/StudentJoinClass";
import ViewMyClasses from "./pages/ViewMyClasses";
// Inside your <Routes> block:


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
        <Route path="/student-chatbot" element={<StudentChatbot />} />
        <Route path="/teacher/create-class" element={<TeacherCreateClass />} />
<        Route path="/student/join-class" element={<StudentJoinClass />} />
        <Route path="/my-classes" element={<ViewMyClasses role={localStorage.getItem("role")} />} />

        {/* add other routes */}
      </Routes>
    </Router>
  );
}

export default App;



