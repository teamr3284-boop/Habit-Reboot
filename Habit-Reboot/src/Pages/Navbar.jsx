import { Link } from "react-router-dom";
import "../stylings/Navbar.css";


export default function Navbar() {
  return (
    <nav className="navbar">
   

      <div className="nav-links">
        <div className="logins"></div><Link to="/Login">Login</Link>
        <div className="signs"></div><Link to="/Signup">SignUp</Link>
      </div>
    </nav>
  );
}