import { useNavigate } from "react-router-dom";
import "../stylings/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo / Brand */}
        <div className="logo" onClick={() => navigate("/")}>
          Habit Reboot
        </div>

        {/* Navigation Buttons */}
        <div className="nav-links">
          <button
            className="nav-btn signup"
            onClick={() => navigate("/Signup")}
          >
            Signup
          </button>

          <button
            className="nav-btn login"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}