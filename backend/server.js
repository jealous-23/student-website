const express = require("express");
const cors = require("cors");
require("dotenv").config();
const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

// Test the API
app.get("/", (req, res) => {
  res.send("Student API is running!");
});

// READ: Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// CREATE: Add a student
app.post("/api/students", async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof course !== "string" || !course.trim()
    ) {
      return res.status(400).json({ error: "Name, email, and course are required." });
    }

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        course: course.trim()
      }
    });

    res.status(201).json(student);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "That email address already exists." });
    }
    res.status(500).json({ error: "Failed to create student" });
  }
});

// UPDATE: Edit a student
app.put("/api/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, course } = req.body;

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof course !== "string" || !course.trim()
    ) {
      return res.status(400).json({ error: "Name, email, and course are required." });
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        name: name.trim(),
        email: email.trim(),
        course: course.trim()
      }
    });

    res.json(student);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Student not found" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Failed to update student" });
  }
});

// DELETE: Remove a student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    await prisma.student.delete({
      where: { id }
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(500).json({ error: "Failed to delete student" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
