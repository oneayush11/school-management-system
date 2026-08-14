import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    phone: "",
    rollNumber: "",
    className: "",
    employeeId: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      phone: form.phone,
      extra:
        form.role === "student"
          ? { rollNumber: form.rollNumber, className: form.className }
          : form.role === "teacher"
          ? { employeeId: form.employeeId, subject: form.subject }
          : undefined,
    };

    try {
      const data = await register(payload);
      if (data.role === "admin") navigate("/admin");
      else if (data.role === "teacher") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "student" && (
          <>
            <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} required />
            <input name="className" placeholder="Class (e.g. 10th A)" value={form.className} onChange={handleChange} required />
          </>
        )}

        {form.role === "teacher" && (
          <>
            <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
            <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
