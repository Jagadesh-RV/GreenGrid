import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import "../styles/recommendations.css";

export default function Recommendations() {
  const navigate = useNavigate();

  // 🔹 Dynamic data (later replace with API)
  const crops = [
    {
      id: 1,
      name: "Soybean",
      yield: "18–22 quintal/acre",
      duration: "90–100 days",
      water: "Moderate",
      icon: "🌿",
    },
    {
      id: 2,
      name: "Pigeon Pea",
      yield: "10–12 quintal/acre",
      duration: "150 days",
      water: "Low",
      icon: "🌱",
    },
    {
      id: 3,
      name: "Maize",
      yield: "15–20 quintal/acre",
      duration: "100 days",
      water: "Medium",
      icon: "🌽",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} />

      <div className={`page-main${collapsed ? " sidebar-collapsed" : ""}`}>
        <Navbar onToggle={() => setCollapsed(c => !c)} sidebarCollapsed={collapsed} />

        <div className="page-content">
          <h2>🌱 Smart Crop Recommendations</h2>
          <p className="subtitle">
            AI-powered suggestions based on soil, weather & field data
          </p>

          <div className="rec-grid">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="rec-card premium"
                onClick={() => navigate(`/crop/${crop.id}`)}
              >
                <div className="rec-header">
                  <span className="icon">{crop.icon}</span>
                  <h3>{crop.name}</h3>
                </div>

                <div className="rec-body">
                  <p><b>Yield:</b> {crop.yield}</p>
                  <p><b>Duration:</b> {crop.duration}</p>
                  <p><b>Water Need:</b> {crop.water}</p>
                </div>

                <button className="details-btn">View Details →</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}