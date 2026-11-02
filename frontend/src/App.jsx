import { useEffect, useState } from "react";
import './App.css';

const API = "http://localhost:3000/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  
  // Track if we are editing an existing student (holds their ID, or null)
  const [editingId, setEditingId] = useState(null);

  async function loadStudents() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Unable to load students");
      setStudents(await response.json());
    } catch {
      setMessage("Cannot connect to the server.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  // Handles both Creating AND Updating records
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    // Determine endpoint url and HTTP technique depending on application state
    const url = editingId ? `${API}/${editingId}` : API;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, course })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save student");
      }

      // Reset application state back to clean default inputs
      setName("");
      setEmail("");
      setCourse("");
      setEditingId(null); 
      setMessage(editingId ? "Student updated successfully!" : "Student saved successfully!");
      await loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  // Populates the form inputs with data from the student being edited
  function startEdit(student) {
    setEditingId(student.id);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setMessage(""); // Clear out any stale alerts
  }

  // Cancels editing state and flushes form inputs
  function cancelEdit() {
    setEditingId(null);
    setName("");
    setEmail("");
    setCourse("");
  }

  // Dispatches network payload to DELETE entry natively from Database
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student record?")) return;
    setMessage("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete student");
      }

      setMessage("Student deleted successfully.");
      
      // If we happened to delete the entry we were currently editing, reset the form
      if (editingId === id) {
        cancelEdit();
      }

      await loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>Student Information System</h1>
      <p className="subtitle">Add a student and save the record to MySQL through Prisma.</p>

      {/* Header switches adaptively based on state */}
      <h3>{editingId ? "✏️ Edit Student Info" : "➕ Add New Student"}</h3>
      
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Full name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          placeholder="Course (e.g., BSIT)" 
          value={course} 
          onChange={e => setCourse(e.target.value)} 
          required 
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn-primary">
            {editingId ? "Update Student" : "Save Student"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-secondary">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {message && <p role="status" className="status-msg">{message}</p>}

      <h2>Registered Students</h2>
      {students.length === 0 ? (
        <p className="no-data">No students found.</p>
      ) : (
        <ul className="student-list">
          {students.map(student => (
            <li key={student.id} className="student-item">
              <div className="student-info">
                <strong>{student.name}</strong> — {student.course} 
                <span className="student-email">{student.email}</span>
              </div>
              <div className="student-actions">
                <button onClick={() => startEdit(student)} className="btn-secondary">Update</button>
                <button onClick={() => handleDelete(student.id)} className="btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
