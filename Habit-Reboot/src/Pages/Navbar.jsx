import { Link } from "react-router-dom";
import "../stylings/Navbar.css";


export default function Navbar() {
  return (
    <nav className="navbar">
   

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">SignUp</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}