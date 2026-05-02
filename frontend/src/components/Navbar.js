import { useState } from "react";
import "./navbar.css";

export default function Navbar({ toggleSidebar }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <span className="menu-icon" onClick={toggleSidebar}>☰</span>
        <h2>GreenGrid AI</h2>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        <span className="icon">🔔</span>

        <div className="profile" onClick={() => setOpen(!open)}>
          👤 Farmer

          {open && (
            <div className="dropdown">
              <p>Edit Profile</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}