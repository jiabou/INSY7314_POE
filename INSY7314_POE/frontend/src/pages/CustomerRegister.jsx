import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    id_number: "",
    account_number: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/customers", formData);
      if (res.data.success) {
        setMessage("Registration successful! Please log in.");
        navigate("/customer/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Registration</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
      <input name="id_number" placeholder="ID Number" onChange={handleChange} required />
      <input name="account_number" placeholder="Account Number" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default CustomerRegister;