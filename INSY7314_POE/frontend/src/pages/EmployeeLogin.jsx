import { useState, useContext } from "react";  
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import { validateField } from "../utils/regexValidation.js";

//Dave Gray (2022) Login page:

const EmployeeLogin = () => {
  const { setEmployee } = useContext(EmployeeContext); //Codr Kai (2023) Context: Set employee data
  const [form, setForm] = useState({ employee_id: "", role: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //The IIE (2025:69) Regex from w3schools:
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    for (const [key, value] of Object.entries(form)) {
      if (!validateField(key, value)) {
        return setError(`Invalid ${key.replace("_", " ")}`);
      }
    }
    try {
      const res = await axios.post("https://localhost:5000/employees/login", form);
      if (res.data.success) {
        setEmployee(res.data.data); //Codr Kai (2023) Context: Save all employee data in context
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

/*
Reference list:
React.js App Project | MERN Stack Tutorial. 2022. YouTube video, added by Dave Gray. [Online]. Available at: https://www.youtube.com/watch?v=5cc09qZK0VU [Accessed 9 October 2025]. 
The IIE. 2025. LAB GUIDE 2025 [INSY7314 LAB GUIDE]. The Independent Institute of Education: Unpublished. 
React JS Tutorial [2023]: How to pass data between pages - Params, Props, and Context. 2023. YouTube video, added by Codr Kai. [Online]. Available at: https://www.youtube.com/watch?v=J6-Iw0cJYJk [Accessed 4 November 2025]. 
*/