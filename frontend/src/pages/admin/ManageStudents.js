import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/students");
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="loading">Loading students...</p>;

  return (
    <div className="manage-page">
      <h2>Manage Students</h2>
      {error && <p className="error-text">{error}</p>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Class</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.user?.name}</td>
              <td>{s.rollNumber}</td>
              <td>{s.className}</td>
              <td>{s.user?.email}</td>
              <td>
                <button className="btn-link danger" onClick={() => handleDelete(s._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="5">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
