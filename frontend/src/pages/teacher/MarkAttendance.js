import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const MarkAttendance = () => {
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    if (!className) return;
    try {
      const { data } = await API.get(`/students?className=${encodeURIComponent(className)}`);
      setStudents(data);
      const initial = {};
      data.forEach((s) => (initial[s._id] = "present"));
      setStatusMap(initial);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    }
  };

  useEffect(() => {
    setMessage("");
  }, [className]);

  const handleStatusChange = (studentId, status) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const records = students.map((s) => ({
        student: s._id,
        status: statusMap[s._id] || "present",
      }));
      await API.post("/attendance/bulk", { className, date, records });
      setMessage("Attendance submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit attendance");
    }
  };

  return (
    <div className="manage-page">
      <h2>Mark Attendance</h2>
      <div className="attendance-controls">
        <input
          placeholder="Class (e.g. 10th A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="btn btn-outline" onClick={fetchStudents} type="button">
          Load Students
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
      {message && <p className="success-text">{message}</p>}

      {students.length > 0 && (
        <form onSubmit={handleSubmit}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.user?.name}</td>
                  <td>{s.rollNumber}</td>
                  <td>
                    <select
                      value={statusMap[s._id] || "present"}
                      onChange={(e) => handleStatusChange(s._id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="leave">Leave</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary">
            Submit Attendance
          </button>
        </form>
      )}
    </div>
  );
};

export default MarkAttendance;
