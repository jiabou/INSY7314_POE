import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

//Dave Gray (2022) Page with a table:

const InternationalPaymentsPortal = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const { employee } = useContext(EmployeeContext); //Codr Kai (2023) Context: Get employee data

  const fetchPayments = async () => {
    try {
      const res = await axios.get("https://localhost:5000/transactions/fetch");
      if (res.data.success) setPayments(res.data.data);
      else setError("Failed to load transactions");
    } catch {
      setError("Server error while fetching transactions");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

   const handleUpdate = async (id, status) => {
    if (!employee || !employee.employee_id) {
      alert("Employee not logged in.");
      return;
    }
  
    try {
      await axios.put(`https://localhost:5000/transactions/update/${id}`, {
        status,
        verified_by: employee.employee_id, //Codr Kai (2023) Context: Use employee_id
        verified_at: new Date().toISOString(),
      });
      fetchPayments();
    } catch {
      alert("Error updating transaction.");
    }
  };

  return (
    <div>
      <h2>International Payments Portal</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Customer</th><th>Amount</th><th>Currency</th><th>Payee Account</th><th>SWIFT</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr><td colSpan="8">No pending payments</td></tr>
          ) : (
            payments.map(p => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.customer_id}</td>
                <td>{p.amount}</td>
                <td>{p.currency}</td>
                <td>{p.payee_account}</td>
                <td>{p.payee_swift}</td>
                <td>{p.status}</td>
                <td>
                  <button className="action-btn accept" onClick={() => handleUpdate(p._id, "Accepted")}>Accept</button>
                  <button className="action-btn deny" onClick={() => handleUpdate(p._id, "Rejected")}>Deny</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternationalPaymentsPortal;

/*
Reference list:
React.js App Project | MERN Stack Tutorial. 2022. YouTube video, added by Dave Gray. [Online]. Available at: https://www.youtube.com/watch?v=5cc09qZK0VU [Accessed 9 October 2025]. 
The IIE. 2025. LAB GUIDE 2025 [INSY7314 LAB GUIDE]. The Independent Institute of Education: Unpublished. 
React JS Tutorial [2023]: How to pass data between pages - Params, Props, and Context. 2023. YouTube video, added by Codr Kai. [Online]. Available at: https://www.youtube.com/watch?v=J6-Iw0cJYJk [Accessed 4 November 2025]. 
*/