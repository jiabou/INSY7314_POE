import { useState } from "react";
import axios from "axios";

const MakePayments = () => {
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/transactions", form);
      if (res.data.success) {
        setMessage("Payment submitted successfully.");
        setForm((prev) => ({ ...prev, amount: "", payee_account: "", payee_swift: "" })); // reset some fields
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

      <input name="customer_id" placeholder="Customer ID" onChange={handleChange} value={form.customer_id} required />
      <input name="amount" placeholder="Amount" type="number" step="0.01" onChange={handleChange} value={form.amount} required />
      <input name="currency" placeholder="Currency (e.g., USD)" onChange={handleChange} value={form.currency} required />
      <input name="provider" placeholder="Provider" value={form.provider} readOnly />
      <input name="payee_account" placeholder="Payee Account" onChange={handleChange} value={form.payee_account} required />
      <input name="payee_swift" placeholder="Payee SWIFT" onChange={handleChange} value={form.payee_swift} required />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default MakePayments;
