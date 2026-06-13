import { useContext, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FieldContext } from "../context/FieldContext";
import { getCrops } from "../api/cropApi";
import "../styles/layout.css";
import "../styles/cropManagement.css";

const CROP_ICONS = {
  Paddy: "🌾",
  Wheat: "🌿",
  Maize: "🌽",
  Tomato: "🍅",
  Onion: "🧅",
  Cotton: "☁️",
  Sugarcane: "🎋",
  Banana: "🍌",
  Coconut: "🥥",
  Soybean: "🌱",
  Turmeric: "🟠",
  Groundnut: "🥜",
  Barley: "🌾",
  Millet: "🌾",
};

const fieldCropOptions = [
  "Paddy",
  "Wheat",
  "Maize",
  "Tomato",
  "Onion",
  "Cotton",
  "Sugarcane",
  "Banana",
  "Coconut",
  "Soybean",
  "Turmeric",
  "Groundnut",
  "Barley",
  "Millet",
];

const getWaterStatus = (value) => {
  if (value >= 70) return { label: "Optimal", className: "status-good" };
  if (value >= 45) return { label: "Moderate", className: "status-warn" };
  return { label: "Low", className: "status-alert" };
};

export default function CropManagement() {
  const { fields, setFields } = useContext(FieldContext);
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("acres");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getCrops()
      .then((result) => setCrops(result.data || []))
      .catch(() => setError("Unable to load crop recommendations."))
      .finally(() => setLoading(false));
  }, []);

  const totalAcres = useMemo(
    () => fields.reduce((sum, field) => sum + Number(field.acres || 0), 0),
    [fields]
  );

  const cropDiversity = useMemo(
    () => new Set(fields.filter((field) => field.crop).map((field) => field.crop)).size,
    [fields]
  );

  const topCrop = useMemo(() => {
    const counts = fields.reduce((acc, field) => {
      if (!field.crop) return acc;
      acc[field.crop] = (acc[field.crop] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "No crop selected";
  }, [fields]);

  const sortedFields = useMemo(() => {
    const items = [...fields];

    if (sortBy === "crop") {
      items.sort((a, b) => (a.crop || "").localeCompare(b.crop || ""));
    } else {
      items.sort((a, b) => Number(b.acres || 0) - Number(a.acres || 0));
    }

    return items.filter((field) => {
      const query = search.toLowerCase();
      return (
        field.name.toLowerCase().includes(query) ||
        (field.crop || "").toLowerCase().includes(query) ||
        (field.soil || "").toLowerCase().includes(query)
      );
    });
  }, [fields, search, sortBy]);

  const updateFieldCrop = (fieldId, crop) => {
    setFields((current) =>
      current.map((field) =>
        field.id === fieldId ? { ...field, crop } : field
      )
    );
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} />
      <div className={`page-main${collapsed ? " sidebar-collapsed" : ""}`}>
        <Navbar onToggle={() => setCollapsed(c => !c)} sidebarCollapsed={collapsed} />
        <div className="page-content">
          <div className="page-head">
          <div>
            <h2>🌾 Crop Management</h2>
            <p className="subtitle">
              Monitor field plans, update crop rotations, and track crop health in one place.
            </p>
          </div>
          <div className="page-actions">
            <span className="pill">{fields.length} fields</span>
            <span className="pill">{cropDiversity} crop varieties</span>
          </div>
        </div>

        <div className="summary-grid">
          <article className="summary-card">
            <span className="summary-label">Total Fields</span>
            <strong>{fields.length}</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">Total Acres</span>
            <strong>{totalAcres}</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">Crop Diversity</span>
            <strong>{cropDiversity}</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">Top Crop</span>
            <strong>{topCrop}</strong>
          </article>
        </div>

        <div className="crop-layout">
          <section className="crop-panel">
            <div className="panel-header">
              <div>
                <h3>Field crop plans</h3>
                <p>Review and update the planned crop, irrigation, and soil profile for each field.</p>
              </div>
              <div className="panel-controls">
                <input
                  className="search-field"
                  type="search"
                  placeholder="Search fields, crop, soil..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="acres">Sort by acres</option>
                  <option value="crop">Sort by crop</option>
                </select>
              </div>
            </div>

            <div className="field-grid">
              {sortedFields.map((field) => {
                const water = getWaterStatus(Number(field.water));
                return (
                  <article key={field.id} className="field-card">
                    <div className="field-card-head">
                      <div className="field-card-title">
                        <span className="field-icon">{CROP_ICONS[field.crop] || "🌾"}</span>
                        <div>
                          <h4>{field.name}</h4>
                          <p className="field-meta">{field.crop || "No crop assigned"} · {field.acres} ac</p>
                        </div>
                      </div>
                      <span className={`status-badge ${water.className}`}>{water.label}</span>
                    </div>

                    <div className="field-body">
                      <div className="field-row">
                        <span>Soil</span>
                        <strong>{field.soil || "Unknown"}</strong>
                      </div>
                      <div className="field-row">
                        <span>Irrigation</span>
                        <strong>{field.irrigation || "—"}</strong>
                      </div>
                      <div className="field-row">
                        <span>Water level</span>
                        <strong>{field.water}%</strong>
                      </div>
                    </div>

                    <label className="field-select-label">
                      Change crop plan
                      <select value={field.crop || ""} onChange={(event) => updateFieldCrop(field.id, event.target.value)}>
                        <option value="">Select crop</option>
                        {fieldCropOptions.map((crop) => (
                          <option key={crop} value={crop}>{crop}</option>
                        ))}
                      </select>
                    </label>
                  </article>
                );
              })}

              {sortedFields.length === 0 && (
                <div className="empty-state">
                  <h4>No matching fields</h4>
                  <p>Try adjusting your search or remove the selected filter.</p>
                </div>
              )}
            </div>
          </section>

          <aside className="recommendation-panel">
            <div className="panel-card panel-card--accent">
              <h3>Crop recommendations</h3>
              <p className="small-text">Live crop suggestions from the current catalog and local field metrics.</p>

              {loading && <div className="loader">Loading recommendations...</div>}
              {error && <div className="panel-error">{error}</div>}

              <ul className="recommendation-list">
                {crops.map((crop) => (
                  <li key={crop.name} className="recommendation-item">
                    <span className="recommendation-icon">{CROP_ICONS[crop.name] || "🌱"}</span>
                    <div>
                      <strong>{crop.name}</strong>
                      <p>{crop.description || "Suitable for your region with balanced water needs."}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {!loading && crops.length === 0 && !error && (
                <div className="panel-empty">No recommendations available right now.</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
);
}
