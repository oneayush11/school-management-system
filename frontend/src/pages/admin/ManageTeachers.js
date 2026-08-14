import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      const { data } = await API.get("/teachers");
      setTeachers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this teacher?")) return;
    try {
      await API.delete(`/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="loading">Loading teachers...</p>;

  return (
    <div className="manage-page">
      <h2>Manage Teachers</h2>
      {error && <p className="error-text">{error}</p>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t._id}>
              <td>{t.user?.name}</td>
              <td>{t.employeeId}</td>
              <td>{t.subject}</td>
              <td>{t.user?.email}</td>
              <td>
                <button className="btn-link danger" onClick={() => handleDelete(t._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan="5">No teachers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeachers;
