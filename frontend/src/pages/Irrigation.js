import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/irrigation.css";
useEffect(() => {
  axios.get("http://localhost:5000/api/fields")
    .then(res => setFields(res.data));
}, []);

const toggle = async (field) => {
  const res = await axios.put(
    `http://localhost:5000/api/fields/${field._id}`,
    { status: !field.status }
  );

  setFields(fields.map(f => f._id === field._id ? res.data : f));
};
export default function Irrigation() {

  const [fields, setFields] = useState([
    { id: 1, name: "Field A", water: 50, status: false },
    { id: 2, name: "Field B", water: 30, status: true }
  ]);

  const toggle = (id) => {
    setFields(fields.map(f =>
      f.id === id ? { ...f, status: !f.status } : f
    ));
  };

  const changeWater = (id, value) => {
    setFields(fields.map(f =>
      f.id === id ? { ...f, water: value } : f
    ));
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <h2>💧 Smart Irrigation</h2>

        <div className="irrigation-grid">
          {fields.map(f => (
            <div key={f.id} className="irrigation-card">

              <h3>{f.name}</h3>

              <p>Water Level: {f.water}%</p>

              <input
                type="range"
                min="0"
                max="100"
                value={f.water}
                onChange={(e) => changeWater(f.id, e.target.value)}
              />

              <button
                className={f.status ? "on" : "off"}
                onClick={() => toggle(f.id)}
              >
                {f.status ? "Turn OFF" : "Turn ON"}
              </button>

            </div>
          ))}
        </div>

        {/* AI Suggestion */}
        <div className="ai-box">
          💡 AI Suggestion: Reduce irrigation for Field B due to expected rainfall.
        </div>

      </div>
    </div>
  );
}