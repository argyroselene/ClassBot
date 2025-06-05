const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const Class = require("../models/Class");

// 📌 POST /api/classes — Create a new class (Teacher only)
router.post("/", authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  const code = Math.random().toString(36).substring(2, 8); // e.g. 'a8fh2b'

  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Only teachers can create classes" });
  }

  try {
    const newClass = await Class.create({
      name,
      description,
      code,
      teacher: req.user.id,
    });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: "Failed to create class" });
  }
});

// 📌 POST /api/classes/join — Join a class with code (Student only)
router.post("/join", authenticateToken, async (req, res) => {
  const { code } = req.body;

  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can join classes" });
  }

  try {
    const foundClass = await Class.findOne({ code });
    if (!foundClass) return res.status(404).json({ message: "Class not found" });

    if (foundClass.students.includes(req.user.id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    foundClass.students.push(req.user.id);
    await foundClass.save();

    res.json({ message: "Joined class", class: foundClass });
  } catch (err) {
    res.status(500).json({ error: "Failed to join class" });
  }
});

// 📌 GET /api/classes/teacher — Get classes created by the teacher
router.get("/teacher", authenticateToken, async (req, res) => {
  if (req.user.role !== "teacher")
    return res.status(403).json({ message: "Only teachers can view this." });

  try {
    const classes = await Class.find({ teacher: req.user.id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teacher's classes" });
  }
});

// 📌 GET /api/classes/student — Get classes joined by student
router.get("/student", authenticateToken, async (req, res) => {
  if (req.user.role !== "student")
    return res.status(403).json({ message: "Only students can view this." });

  try {
    const classes = await Class.find({ students: req.user.id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student's classes" });
  }
});

module.exports = router;

