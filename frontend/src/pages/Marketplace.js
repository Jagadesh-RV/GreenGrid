import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function Marketplace() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h2>Marketplace</h2>

        <input className="search" placeholder="Search products..." />

        <h3>Featured Products</h3>
        <div className="grid">
          <div className="card">
            <p>Hybrid Maize</p>
            <b>₹850/kg</b>
          </div>
          <div className="card">
            <p>Vermicompost</p>
            <b>₹320/kg</b>
          </div>
          <div className="card">
            <p>Bio Pesticide</p>
            <b>₹450/L</b>
          </div>
        </div>

        <h3>Sell Your Produce</h3>
        <div className="grid">
          <div className="card">
            <p>Wheat</p>
            <b>₹2100/quintal</b>
            <button>Sell</button>
          </div>

          <div className="card">
            <p>Onion</p>
            <b>₹1350/quintal</b>
            <button>Sell</button>
          </div>
        </div>

      </div>
    </div>
  );
}