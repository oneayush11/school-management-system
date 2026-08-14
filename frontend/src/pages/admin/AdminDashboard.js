import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name} 👋 (Admin)</h2>
      <div className="dashboard-cards">
        <Link to="/admin/students" className="dashboard-card">
          <h3>👨‍🎓 Manage Students</h3>
          <p>View, update, or remove student records.</p>
        </Link>
        <Link to="/admin/teachers" className="dashboard-card">
          <h3>👩‍🏫 Manage Teachers</h3>
          <p>View, update, or remove teacher records.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
