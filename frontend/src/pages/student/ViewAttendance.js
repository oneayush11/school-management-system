import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ViewAttendance = () => {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({ total: 0, present: 0, percentage: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/attendance/me")
      .then(({ data }) => {
        setRecords(data.records);
        setSummary(data.summary);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load attendance"));
  }, []);

  return (
    <div className="manage-page">
      <h2>My Attendance</h2>
      {error && <p className="error-text">{error}</p>}

      <div className="summary-cards">
        <div className="summary-card">
          <h3>{summary.total}</h3>
          <p>Total Days</p>
        </div>
        <div className="summary-card">
          <h3>{summary.present}</h3>
          <p>Present</p>
        </div>
        <div className="summary-card">
          <h3>{summary.percentage}%</h3>
          <p>Attendance</p>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td className={`status status-${r.status}`}>{r.status}</td>
              <td>{r.remarks || "-"}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan="3">No attendance records yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
