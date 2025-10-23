import { useEffect, useState } from "react";
import axios from "axios";

const InternationalPaymentsPortal = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/transactions/fetch");
        if (res.data.success) {
          setPayments(res.data.data);
        } else {
          setError("Failed to load transactions");
        }
      } catch {
        setError("Server error while fetching transactions");
      }
    };
    fetchPayments();
  }, []);

  return (
    <div>
      <h2>International Payments Portal</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Customer</th><th>Amount</th><th>Currency</th><th>Payee Account</th><th>SWIFT</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr><td colSpan="7">No payments pending</td></tr>
          ) : (
            payments.map(p => (
              <tr key={p._id}>
                <td>{p._id}</td><td>{p.customer_id}</td><td>{p.amount}</td><td>{p.currency}</td><td>{p.payee_account}</td><td>{p.payee_swift}</td><td>{p.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternationalPaymentsPortal;
