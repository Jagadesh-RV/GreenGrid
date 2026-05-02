import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import "../styles/profile.css";

export default function Profile() {

  // 🔹 Farmer State
  const [farmer, setFarmer] = useState({
    name: "Ramesh Kumar",
    location: "Tamil Nadu, India",
    totalLand: 12,
    phone: "9876543210"
  });

  const [editFarmer, setEditFarmer] = useState(false);

  // 🔹 Fields State
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "Field A",
      acres: 4,
      crop: "Paddy",
      irrigation: "Drip",
      soil: "Clay"
    },
    {
      id: 2,
      name: "Field B",
      acres: 3,
      crop: "Maize",
      irrigation: "Sprinkler",
      soil: "Loamy"
    }
  ]);

  const [editingFieldId, setEditingFieldId] = useState(null);

  // 🔹 Handle Farmer Edit
  const handleFarmerChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Field Edit
  const handleFieldChange = (id, e) => {
    const updated = fields.map((f) =>
      f.id === id ? { ...f, [e.target.name]: e.target.value } : f
    );
    setFields(updated);
  };

  // 🔹 Add New Field
  const addField = () => {
    const newField = {
      id: Date.now(),
      name: "New Field",
      acres: "",
      crop: "",
      irrigation: "",
      soil: ""
    };
    setFields([...fields, newField]);
    setEditingFieldId(newField.id);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        {/* 🔹 Farmer Info */}
        <div className="profile-header">
          <div className="avatar">👤</div>

          <div>
            {editFarmer ? (
              <>
                <input name="name" value={farmer.name} onChange={handleFarmerChange} />
                <input name="location" value={farmer.location} onChange={handleFarmerChange} />
                <input name="phone" value={farmer.phone} onChange={handleFarmerChange} />
                <input name="totalLand" value={farmer.totalLand} onChange={handleFarmerChange} />

                <button onClick={() => setEditFarmer(false)}>Save</button>
              </>
            ) : (
              <>
                <h2>{farmer.name}</h2>
                <p>{farmer.location}</p>
                <p>📞 {farmer.phone}</p>
                <p>🌾 {farmer.totalLand} Acres</p>

                <button onClick={() => setEditFarmer(true)}>Edit Profile</button>
              </>
            )}
          </div>
        </div>

        {/* 🔹 Fields */}
        <h3>🌾 Field Management</h3>

        <button onClick={addField} className="add-btn">+ Add Field</button>

        <div className="field-grid">
          {fields.map((field) => (
            <div key={field.id} className="field-card">

              {editingFieldId === field.id ? (
                <>
                  <input
                    name="name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(field.id, e)}
                  />

                  <input
                    name="acres"
                    value={field.acres}
                    onChange={(e) => handleFieldChange(field.id, e)}
                    placeholder="Acres"
                  />

                  <input
                    name="crop"
                    value={field.crop}
                    onChange={(e) => handleFieldChange(field.id, e)}
                  />

                  <input
                    name="soil"
                    value={field.soil}
                    onChange={(e) => handleFieldChange(field.id, e)}
                  />

                  <input
                    name="irrigation"
                    value={field.irrigation}
                    onChange={(e) => handleFieldChange(field.id, e)}
                  />

                  <button onClick={() => setEditingFieldId(null)}>Save</button>
                </>
              ) : (
                <>
                  <h4>{field.name}</h4>
                  <p>Area: {field.acres} acres</p>
                  <p>Crop: {field.crop}</p>
                  <p>Soil: {field.soil}</p>
                  <p>Irrigation: {field.irrigation}</p>

                  <button onClick={() => setEditingFieldId(field.id)}>
                    Edit
                  </button>
                </>
              )}

            </div>
          ))}
        </div>

        {/* 🔹 AI Insight */}
        <div className="insight-box">
          💡 AI Insight: Try drip irrigation to reduce water usage by 30%.
        </div>

      </div>
    </div>
  );
}