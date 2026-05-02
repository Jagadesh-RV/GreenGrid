import React, { useState } from "react";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="container">
      <Sidebar isOpen={isOpen} />

      <div className="main">
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <h1>Dashboard</h1>

        {/* Top Bar */}
        <div className="topbar">
          <h2>Dashboard</h2>
          <div className="user">
            🔔 <span className="badge">3</span>
            <span className="username">Ramesh</span>
          </div>
        </div>

        {/* Welcome */}
        <h1>Hello, Ramesh!</h1>
        <p className="subtitle">Here's what's happening in your farm today.</p>

        {/* Cards Row */}
        <div className="row">
          
          {/* Weather Card */}
          <div className="card weather" style={{ animation: "fadeIn 0.5s ease" }}>
            <div className="left">
              <h3>Current Weather</h3>
              <div className="temp">28°C</div>
              <p>Partly Cloudy</p>
              <small>Location: Pune, Maharashtra</small>
            </div>

            <div className="right">
              <p>Humidity: <b>65%</b></p>
              <p>Wind: <b>12 km/h</b></p>
              <p>Rain Chance: <b>20%</b></p>
            </div>
          </div>

          {/* Crop Card */}
          <div className="card crop">
            <h3>Crop Status</h3>
            <h2>Sugarcane</h2>
            <p className="good">Good Condition</p>
          </div>
        </div>

        {/* Small Cards */}
        <div className="grid">
          <div className="mini-card">💧 Soil Moisture<br/><b>35% (Optimal)</b></div>
          <div className="mini-card">🚿 Irrigation<br/><b>Recommended Today</b></div>
          <div className="mini-card">🛡 Pest Alert<br/><b>No Risk</b></div>
          <div className="mini-card">📈 Market Price<br/><b>Good Time</b></div>
        </div>

        {/* Bottom Section */}
        <div className="bottom">
          
          {/* Alerts */}
          <div className="card">
            <h3>Recent Alerts</h3>
            <ul>
              <li>🌧 Light rain expected tomorrow</li>
              <li>💧 Irrigation recommended</li>
              <li>🌿 Crop growing well</li>
            </ul>
          </div>

          {/* Fields */}
          <div className="card">
            <h3>Your Fields</h3>
            <div className="field">
              🌾 Field 1 - Sugarcane <span className="good">Good</span>
            </div>
            <div className="field">
              🌾 Field 2 - Wheat <span className="warn">Needs Irrigation</span>
            </div>
            <div className="field">
              🌾 Field 3 - Cotton <span className="good">Good</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}