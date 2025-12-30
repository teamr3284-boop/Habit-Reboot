import { useNavigate } from "react-router-dom";
import "../stylings/Navbar.css";


export default function Navbar() {
  const nigga = useNavigate()
  return (
    <nav className="navbar">
   

      <div className="nav-links">
    
          <button onClick ={()=> nigga('/Signup')} className="sign-btn">Sign Up</button>
        <button onClick ={()=> nigga('/Login')} className="log-btn">Log in</button>
      
      </div>
    </nav>
  );
}