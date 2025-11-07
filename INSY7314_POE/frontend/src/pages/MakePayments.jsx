import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CustomerContext } from "../context/CustomerContext.jsx";
import { validateField } from "../utils/regexValidation.js";

//Dave Gray (2022) Add item page:

const MakePayments = () => {
  const { customer } = useContext(CustomerContext); //Codr Kai (2023) Context: Get customer data
  const [form, setForm] = useState({
    customer_id: "",
    amount: "",
    currency: "",
    provider: "SWIFT",
    payee_account: "",
    payee_swift: "",
    status: "Pending",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //Codr Kai (2023) Context: Set customer_id when customer logs in:
  useEffect(() => {
    if (customer && customer.id) {
      setForm(prev => ({ ...prev, customer_id: customer.id }));
    }
  }, [customer]);

  //The IIE (2025:69) Regex from w3schools:
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    for (const [key, value] of Object.entries(form)) {
      if (!validateField(key, value)) {
        return setError(`Invalid ${key.replace("_", " ")}`);
      }
    }

    try {
      const res = await axios.post("https://localhost:5000/transactions", form);
      if (res.data.success) {
        setMessage("Payment submitted successfully.");
        setForm((prev) => ({ ...prev, amount: "", payee_account: "", payee_swift: "" }));
      } else {
        setError(res.data.message || "Payment failed");
      }
    } catch {
      setError("Server error, try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make Payment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <input name="customer_id" value={form.customer_id} readOnly />
      <input name="amount" placeholder="Amount" type="number" step="0.01" onChange={handleChange} value={form.amount} required />
      <input name="currency" placeholder="Currency (e.g., USD)" onChange={handleChange} value={form.currency} required />
      <input name="provider" value={form.provider} readOnly />
      <input name="payee_account" placeholder="Payee Account" onChange={handleChange} value={form.payee_account} required />
      <input name="payee_swift" placeholder="Payee SWIFT" onChange={handleChange} value={form.payee_swift} required />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default MakePayments;

/*
Reference list:
React.js App Project | MERN Stack Tutorial. 2022. YouTube video, added by Dave Gray. [Online]. Available at: https://www.youtube.com/watch?v=5cc09qZK0VU [Accessed 9 October 2025]. 
The IIE. 2025. LAB GUIDE 2025 [INSY7314 LAB GUIDE]. The Independent Institute of Education: Unpublished. 
React JS Tutorial [2023]: How to pass data between pages - Params, Props, and Context. 2023. YouTube video, added by Codr Kai. [Online]. Available at: https://www.youtube.com/watch?v=J6-Iw0cJYJk [Accessed 4 November 2025]. 
*/