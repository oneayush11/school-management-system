# School Management System (MERN Stack)

Ek complete **MERN Stack** School Management System — Student records, Teacher
details, aur Attendance manage karne ke liye. Role-based access diya gaya hai
Admin, Teacher, aur Student ke liye, JWT authentication ke saath.

## 🧰 Tech Stack
- **MongoDB** — Database (Mongoose ODM)
- **Express.js** — Backend REST API
- **React.js** — Frontend UI
- **Node.js** — Server runtime
- **JWT + bcrypt** — Secure authentication

## 📁 Folder Structure
```
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
Sabse pehle MongoDB chalao — do options hain:

**Option A — Local MongoDB**
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) install karo.
2. Service start karo: `mongod` (ya `net start MongoDB` on Windows / `sudo systemctl start mongod` on Linux).
3. Connection string: `mongodb://127.0.0.1:27017/school_management`

**Option B — MongoDB Atlas (cloud, free tier)**
1. [mongodb.com/atlas](https://www.mongodb.com/atlas) par free cluster banao.
2. "Connect" → "Drivers" se connection string copy karo, jaisa:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/school_management`

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
`.env` file kholo aur `MONGO_URI` apni MongoDB connection string se update karo,
aur `JWT_SECRET` ko koi bhi random secret string se replace karo.

```bash
npm run dev
```
Backend `http://localhost:5001` par chalega.

### 3. Frontend Setup
Naye terminal me:
```bash
cd frontend
npm install
npm start
```
Frontend `http://localhost:3000` par khulega.

### 4. First Use
1. Home page par jao — Register button dabao.
2. "Admin" role select karke apna admin account bana lo.
3. Teacher/Student accounts bhi "Register" page se ban sakte hain, ya admin
   se add karwa sakte ho (future enhancement: admin-only user creation form).
4. Login karke role ke hisaab se dashboard dikhega:
   - **Admin** → Manage Students, Manage Teachers
   - **Teacher** → Mark Attendance (class-wise)
   - **Student** → View Attendance (with percentage)

## 🔐 Roles & Permissions
| Role    | Access                                                        |
|---------|-----------------------------------------------------------------|
| Admin   | Sab students/teachers dekh, update, delete kar sakta hai        |
| Teacher | Apni class ke students ki attendance mark kar sakta hai         |
| Student | Sirf apni profile aur apni attendance dekh sakta hai            |

## 📡 Main API Endpoints
```
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
Footer me Instagram, LinkedIn, Twitter/X, aur GitHub ke icons hain. Apne
actual profile links daalne ke liye ye file kholo:
`frontend/src/components/Footer.js` → `SOCIAL_LINKS` object me apne URLs
daal do:
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
