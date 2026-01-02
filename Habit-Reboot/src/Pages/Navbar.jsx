import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../stylings/Navbar.css";



export default function Navbar() {
const nigga = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="logins"></div><button onClick={()=>{nigga('/Signup')}}>Signup</button>
        <div className="signs"></div><button onClick={()=>{nigga('/Login')}}>Login</button>
      </div>
    </nav>
  );
}