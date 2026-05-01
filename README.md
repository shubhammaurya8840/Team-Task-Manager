# 🚀 Team Task Manager (Full Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access (Admin / Member).

---

## 🌐 Live Demo

* 🔗 Frontend: https://teamtaskmanager1.netlify.app
* 🔗 Backend: https://team-task-manager-production-3608.up.railway.app

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login (JWT based)
* Secure password hashing (bcrypt)

### 👥 Role-Based Access

* Admin: Create projects, assign tasks
* Member: View & update assigned tasks

### 📁 Project Management

* Create projects
* Delete projects (with cascade delete of tasks)
* Project-wise task filtering

### ✅ Task Management

* Create & assign tasks
* Update task status (Pending / Completed)
* Delete tasks

### ⏰ Dashboard

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks (based on due date)

---

## 🛠 Tech Stack

**Frontend:**

* React (Vite)
* Tailwind CSS
* Axios

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Atlas)

**Deployment:**

* Backend: Railway
* Frontend: Netlify

---

## 📂 Folder Structure

```bash
team-task-manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/shubhammaurya8840/Team-Task-Manager.git
cd team-task-manager
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth

* POST `/auth/signup`
* POST `/auth/login`

### Projects

* GET `/projects`
* POST `/projects`
* DELETE `/projects/:id`

### Tasks

* GET `/tasks`
* POST `/tasks`
* PUT `/tasks/:id`
* DELETE `/tasks/:id`

### Users

* GET `/users`

---

## 🎥 Demo Flow

1. Admin logs in
2. Creates a project
3. Assigns task to member
4. Member logs in
5. Updates task status
6. Dashboard updates in real-time

---

## 🧠 Key Concepts Used

* REST API design
* JWT Authentication
* Role-based access control
* MongoDB relationships (Project → Task mapping)
* Cascade delete (project → tasks)

---

## 📈 Future Improvements

* Notifications system
* File attachments
* Team collaboration features
* Drag & drop task board

---

## 👨‍💻 Author

* Name: Shubham Maurya
* GitHub: https://github.com/shubhammaurya8840


