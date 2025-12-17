import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h3 >Habit Reboot</h3>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}