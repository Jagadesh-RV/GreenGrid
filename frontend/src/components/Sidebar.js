import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/layout.css";

const NAV = [
  {
    section: "Overview",
    items: [
      { to: "/dashboard",    icon: "🏠", label: "Dashboard" },
      { to: "/weather",      icon: "🌤", label: "Weather"   },
    ]
  },
  {
    section: "Farm Management",
    items: [
      { to: "/fields",       icon: "🗺️",  label: "My Fields"       },
      { to: "/crops",        icon: "🌾",  label: "Crop Management" },
      { to: "/irrigation",   icon: "💧",  label: "Irrigation",     badge: "Live" },
      { to: "/soil",         icon: "🧪",  label: "Soil Report"     },
    ]
  },
  {
    section: "Market & Community",
    items: [
      { to: "/marketplace",  icon: "🛒",  label: "Marketplace"     },
      { to: "/community",    icon: "🌐",  label: "Community"       },
      { to: "/recommendations", icon: "✨", label: "AI Insights"   },
    ]
  },
  {
    section: "Account",
    items: [
      { to: "/profile",      icon: "👤",  label: "Profile"         },
    ]
  }
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <img src="🌾" />
          </div>
        <span className="sidebar-name">Green Grid</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV.map(group => (
          <div key={group.section}>
            <div className="nav-section-label">{group.section}</div>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-item${isActive ? " active" : ""}`
                }
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">👨‍🌾</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Ramesh Kumar</div>
            <div className="sidebar-user-role">Tamil Nadu</div>
          </div>
        </div>
      </div>
    </aside>
  );
}