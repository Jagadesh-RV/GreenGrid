import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/layout.css";

const PAGE_LABELS = {
  "/dashboard":      "Dashboard",
  "/weather":        "Weather",
  "/fields":         "My Fields",
  "/crops":          "Crop Management",
  "/irrigation":     "Irrigation",
  "/soil":           "Soil Report",
  "/marketplace":    "Marketplace",
  "/community":      "Community",
  "/recommendations":"AI Insights",
  "/profile":        "Profile",
};

export default function Navbar({ onToggle, sidebarCollapsed }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const [search, setSearch] = useState("");

  const label = PAGE_LABELS[location.pathname] || "FarmSmart";

  return (
    <header className="navbar">
      <button className="navbar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
        {sidebarCollapsed ? "▶" : "☰"}
      </button>

      <div className="navbar-breadcrumb">
        <span>FarmSmart</span>
        <span>›</span>
        <b>{label}</b>
      </div>

      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search fields, crops, products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="navbar-actions">
        <button className="navbar-icon-btn" title="Notifications">
          🔔
          <span className="navbar-notif-dot" />
        </button>

        <button className="navbar-icon-btn" title="Weather">
          ⛅
        </button>

        <button
          className="navbar-profile"
          onClick={() => navigate("/profile")}
        >
          <div className="navbar-profile-avatar">👨‍🌾</div>
          <span className="navbar-profile-name">Ramesh</span>
        </button>
      </div>
    </header>
  );
}