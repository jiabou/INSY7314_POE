import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <h1>GlobalBank</h1>
    <Link to="/register">Register</Link> |{" "}
    <Link to="/customer/login">Customer Login</Link> |{" "}
    <Link to="/employee/login">Employee Login</Link>
  </nav>
);

export default Navbar;