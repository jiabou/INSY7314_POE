import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeLogin = () => {
  const [form, setForm] = useState({ employee_id: "", role: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/employees/login", form);
      if (res.data.success) {
        navigate("/portal");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Employee Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="employee_id" placeholder="Employee ID" onChange={handleChange} required />
      <input name="role" placeholder="Role" onChange={handleChange} required />
      <input name="password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default EmployeeLogin;