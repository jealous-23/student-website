# Student Information System

A full-stack CRUD (Create, Read, Update, Delete) web application for managing student records. This project features a modern **React** frontend and a robust **Express** backend integrated with **Prisma ORM** to store and manage data seamlessly inside a **MySQL** database.

---

## 🚀 Features

- **Full CRUD Capabilities:** Seamlessly Add, View, Update, and Delete student records.
- **Form Validation & Cleanup:** Secure fields with native browser validation and automatic data trimming.
- **Robust Error Handling:** Clear status notifications for network disconnects, unique email conflicts (`P2002`), and missing payloads.
- **Modern Flexbox Layout:** Clean, fully responsive interface powered by layout gap management (no `<br>` hacks).

---

## 🛠️ Tech Stack

- **Frontend:** React, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database Engine & Tooling:** MySQL, Prisma ORM
- **Utilities:** CORS, Dotenv

---

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org) (v16 or higher recommended)
- [MySQL Server](https://mysql.com) running locally or hosted in the cloud

---

## 💻 Getting Started

### 1. Clone & Project Directory Setup
Separate your codebase dependencies or set up your environments inside your backend runtime directory:
```bash
cd student-info-system
```

### 2. Backend Installation & Database Migration
Navigate to your server environment directory, then run:

```bash
# Install server modules
npm install

# Initialize environment variables (.env) if missing
# Make sure your database connection string aligns with your local environment:
# DATABASE_URL="mysql://username:password@localhost:3306/student_db"

# Push your Prisma schema layout to build the MySQL Database Tables
npx prisma db push
```

### 3. Start the Backend API Server
Launch the development API endpoint container:
```bash
node server.js
# The server will mount natively at http://localhost:3000
```

### 4. Frontend Installation & Initialization
Navigate over to your React module environment context directory and execute:

```bash
# Install client assets
npm install

# Launch the hot-reloading development workspace
npm run dev
```

---

## 🔌 API Endpoints Reference

Your backend exposes the following REST architecture routes under `http://localhost:3000`:

| Method | Endpoint | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/students` | Fetches all student profiles. | *None* |
| **POST** | `/api/students` | Registers a new student to MySQL. | `{"name": "Jane Doe", "email": "jane@example.com", "course": "BSIT"}` |
| **PUT** | `/api/students/:id` | Modifies an existing student record. | `{"name": "Jane Doe", "email": "jane.d@example.com", "course": "BSCS"}` |
| **DELETE** | `/api/students/:id` | Deletes a student from the ecosystem. | *None* |

---

## 📂 Project Structure

```student-website
├── backend/
│   ├── node_modules/
│   ├── prisma/
│   │   └── schema.prisma    # Database definitions & architecture
│   ├── .env                 # Secret environment database keys
│   ├── prisma.js            # PrismaClient constructor initialization instance
│   └── server.js            # Express routing layer framework 
└── frontend/
    ├── src/
    │   ├── App.jsx          # React state controller template application view
    │   ├── App.css          # Flexbox responsive design assets 
    │   └── main.jsx         # Dom mapping architecture node
```
