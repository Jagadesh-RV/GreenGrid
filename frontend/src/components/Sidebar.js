import { useNavigate } from "react-router-dom";
import { FaCloud, FaLeaf, FaTint, FaStore, FaUsers, FaUser, FaSeedling, FaLightbulb } from "react-icons/fa";
import "../styles/sidebar.css";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>

      <h2 className="sidebar-logo">🌱</h2>

      <ul>
        <li onClick={() => navigate("/dashboard")}><FaLeaf /> <span>Dashboard</span></li>
        <li onClick={() => navigate("/weather")}><FaCloud /> <span>Weather</span></li>
        <li onClick={() => navigate("/soil")}><FaSeedling /> <span>Soil</span></li>
        <li onClick={() => navigate("/irrigation")}><FaTint /> <span>Irrigation</span></li>
        <li onClick={() => navigate("/marketplace")}><FaStore /> <span>Marketplace</span></li>
        <li onClick={() => navigate("/community")}><FaUsers /> <span>Community</span></li>
        <li onClick={() => navigate("/profile")}><FaUser /> <span>Profile</span></li>
        <li onClick={() => navigate("/recommendations")}><FaLightbulb /> <span>AI Advice</span></li>
      </ul>

    </div>
  );
}