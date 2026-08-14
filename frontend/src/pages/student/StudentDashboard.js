import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/students/me/profile")
      .then(({ data }) => setProfile(data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name} 👋 (Student)</h2>

      {profile && (
        <div className="profile-summary">
          <p><strong>Roll Number:</strong> {profile.rollNumber}</p>
          <p><strong>Class:</strong> {profile.className}</p>
        </div>
      )}

      <div className="dashboard-cards">
        <Link to="/student/attendance" className="dashboard-card">
          <h3>📅 View Attendance</h3>
          <p>Check your attendance history and percentage.</p>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
