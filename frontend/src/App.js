import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import MarkAttendance from "./pages/teacher/MarkAttendance";

import StudentDashboard from "./pages/student/StudentDashboard";
import ViewAttendance from "./pages/student/ViewAttendance";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="page-shell">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <PrivateRoute roles={["admin"]}>
                  <ManageStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <PrivateRoute roles={["admin"]}>
                  <ManageTeachers />
                </PrivateRoute>
              }
            />

            <Route
              path="/teacher"
              element={
                <PrivateRoute roles={["teacher"]}>
                  <TeacherDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <PrivateRoute roles={["teacher"]}>
                  <MarkAttendance />
                </PrivateRoute>
              }
            />

            <Route
              path="/student"
              element={
                <PrivateRoute roles={["student"]}>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <PrivateRoute roles={["student"]}>
                  <ViewAttendance />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
