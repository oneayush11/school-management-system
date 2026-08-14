import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name} 👋 (Teacher)</h2>
      <div className="dashboard-cards">
        <Link to="/teacher/attendance" className="dashboard-card">
          <h3>📋 Mark Attendance</h3>
          <p>Mark daily attendance for your assigned class.</p>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
