# School Management System (MERN Stack)

A complete **MERN Stack** School Management System to manage student records, teacher details, and attendance. Role-based access is provided for Admin, Teacher, and Student, with JWT authentication.

## 🧰 Tech Stack
- **MongoDB** — Database (Mongoose ODM)
- **Express.js** — Backend REST API
- **React.js** — Frontend UI
- **Node.js** — Server runtime
- **JWT + bcrypt** — Secure authentication

## 📁 Folder Structure
```text
school-management-system/
├── backend/          # Express + MongoDB API
│   ├── config/       # DB connection
│   ├── controllers/  # Route logic
│   ├── middleware/   # Auth + role-based access
│   ├── models/       # Mongoose schemas (User, Student, Teacher, Attendance)
│   ├── routes/       # API routes
│   └── server.js
└── frontend/         # React app
    └── src/
        ├── api/       # Axios instance
        ├── components/
        ├── context/   # Auth context (login state)
        ├── pages/     # Home, Login, Register, Admin/Teacher/Student pages
        └── assets/    # Home page illustration
```

## 🚀 Setup Instructions

### 1. MongoDB Setup (Database)

First, start MongoDB — there are two options:

**Option A — Local MongoDB**

1. Install MongoDB Community Server.
2. Start the service: `mongod` (or `net start MongoDB` on Windows / `sudo systemctl start mongod` on Linux).
3. Connection string:
   `mongodb://127.0.0.1:27017/school_management`

**Option B — MongoDB Atlas (cloud, free tier)**

1. Create a free cluster on MongoDB Atlas.
2. Go to **Connect → Drivers** and copy the connection string, for example:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/school_management`

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open the `.env` file and update `MONGO_URI` with your MongoDB connection string. Replace `JWT_SECRET` with any random secret string.

```bash
npm run dev
```

The backend will run on `http://localhost:5001`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`.

### 4. First Use

1. Go to the Home page and click the Register button.
2. Select the **Admin** role and create your admin account.
3. Teacher/Student accounts can also be created from the **Register** page, or they can be added by the admin (future enhancement: admin-only user creation form).
4. After login, the dashboard will be shown according to the role:
   - **Admin** → Manage Students, Manage Teachers
   - **Teacher** → Mark Attendance (class-wise)
   - **Student** → View Attendance (with percentage)

## 🔐 Roles & Permissions

| Role | Access |
|---|---|
| Admin | Can view, update, and delete all students/teachers |
| Teacher | Can mark attendance for students in their class |
| Student | Can view only their own profile and attendance |

## 📡 Main API Endpoints

```text
POST   /api/auth/register        Register (student/teacher/admin)
POST   /api/auth/login           Login
GET    /api/auth/profile         Logged-in user profile

GET    /api/students             All students        (admin, teacher)
GET    /api/students/me/profile  Own profile          (student)
PUT    /api/students/:id         Update student        (admin)
DELETE /api/students/:id         Delete student         (admin)

GET    /api/teachers             All teachers          (admin)
PUT    /api/teachers/:id         Update teacher         (admin)
DELETE /api/teachers/:id         Delete teacher         (admin)

POST   /api/attendance           Mark attendance        (teacher, admin)
POST   /api/attendance/bulk      Bulk mark for a class   (teacher, admin)
GET    /api/attendance           Filter records          (admin, teacher)
GET    /api/attendance/me        Own attendance          (student)
```

## ✨ Features

- Role-based access control (RBAC) with JWT
- Password hashing with bcrypt
- Responsive UI (mobile-friendly)
- MongoDB as the primary database (Mongoose models with relationships)
- RESTful APIs for all operations
- Attendance summary with percentage calculation

## 🔗 Footer Social Links

The footer has Instagram, LinkedIn, Twitter/X, and GitHub icons. To add your actual profile links, open this file:

`frontend/src/components/Footer.js` → Add your URLs in the `SOCIAL_LINKS` object:

```js
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  github: "https://github.com/yourusername",
};
```

## 🛠 Future Enhancements (optional ideas)

- Admin panel to directly create teacher/student accounts (instead of self-registration)
- Class/subject/timetable management
- Marks/grades module
- Email notifications
- File upload for profile photos

---

Made with the MERN Stack ❤️
