import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function SoilReport() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h2>Soil & Field Insights</h2>

        <div className="card">
          <h3>Soil Health</h3>
          <p>pH: 6.8 (Optimal)</p>
          <p>Organic Matter: 1.2% (Low)</p>
          <p>Nitrogen: Medium</p>
          <p>Phosphorus: Medium</p>
          <p>Potassium: High</p>
        </div>

        <div className="card">
          <h3>Irrigation Recommendation</h3>
          <p>💧 Irrigate tomorrow morning</p>
          <p>Water Required: 12 mm</p>
          <p>Method: Drip Irrigation</p>
        </div>

        <div className="card">
          <h3>Fertilizer Recommendation</h3>
          <p>Urea: 50 kg/acre</p>
          <p>DAP: 25 kg/acre</p>
          <p>MOP: 25 kg/acre</p>
        </div>

      </div>
    </div>
  );
} 