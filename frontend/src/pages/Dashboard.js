import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";
import { FieldContext } from "../context/FieldContext";
import "../styles/layout.css";
import "../styles/dashboard.css";

/* ─── Mock real-time data (replace with API hooks) ──────────── */
const ALERTS = [
  { id: 1, type: "warning", icon: "🌧", text: "Light rain expected tomorrow — delay spraying.", time: "2h ago" },
  { id: 2, type: "info",    icon: "💧", text: "Field 2 moisture at 22% — irrigation recommended.", time: "4h ago" },
  { id: 3, type: "success", icon: "🌿", text: "Sugarcane crop health is excellent this week.", time: "1d ago" },
  { id: 4, type: "danger",  icon: "🐛", text: "Mild pest risk detected in Field 3 (Cotton).", time: "1d ago" },
];

const MARKET_PRICES = [
  { crop: "Wheat",     price: "₹2,100", unit: "qtl", trend: +3.2, icon: "🌾" },
  { crop: "Tomato",    price: "₹980",   unit: "qtl", trend: +7.1, icon: "🍅" },
  { crop: "Onion",     price: "₹1,350", unit: "qtl", trend: -1.4, icon: "🧅" },
  { crop: "Sugarcane", price: "₹3,200", unit: "ton", trend: +0.8, icon: "🎋" },
];

const QUICK_ACTIONS = [
  { icon: "💧", label: "Start Irrigation", color: "#0ea5e9", path: "/irrigation" },
  { icon: "🧪", label: "Soil Test",        color: "#8b5cf6", path: "/soil"       },
  { icon: "📊", label: "Crop Report",      color: "#16a34a", path: "/crops"      },
  { icon: "🛒", label: "Marketplace",      color: "#e8a020", path: "/marketplace"},
];

/* ─── Animated counter ──────────────────────────────────────── */
function Counter({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const target = parseFloat(value);
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}{suffix}</>;
}

/* ─── Weather mini-card ─────────────────────────────────────── */
function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Simulates real OpenWeatherMap response — swap for real fetch
    setTimeout(() => setWeather({
      temp: 34, feelsLike: 37, humidity: 68,
      wind: 12, condition: "Partly Cloudy",
      rain: 20, location: "Erode, TN"
    }), 600);
  }, []);

  if (!weather) return (
    <div className="dash-weather-card loading">
      <div className="shimmer-line w-60" />
      <div className="shimmer-line w-40" />
    </div>
  );

  return (
    <div className="dash-weather-card">
      <div className="dash-weather-bg">☁️</div>
      <div className="dash-weather-top">
        <div>
          <p className="dash-weather-loc">📍 {weather.location}</p>
          <p className="dash-weather-cond">{weather.condition}</p>
        </div>
        <div className="dash-weather-temp">
          {weather.temp}°<span>C</span>
        </div>
      </div>
      <div className="dash-weather-stats">
        <div className="dash-w-stat">
          <span>💧</span>
          <div><b>{weather.humidity}%</b><span>Humidity</span></div>
        </div>
        <div className="dash-w-stat">
          <span>💨</span>
          <div><b>{weather.wind} km/h</b><span>Wind</span></div>
        </div>
        <div className="dash-w-stat">
          <span>🌧</span>
          <div><b>{weather.rain}%</b><span>Rain</span></div>
        </div>
        <div className="dash-w-stat">
          <span>🌡</span>
          <div><b>{weather.feelsLike}°C</b><span>Feels like</span></div>
        </div>
      </div>
      <div className="dash-weather-advice">
        🌱 Good morning, Ramesh! Optimal conditions for field work today.
      </div>
    </div>
  );
}

/* ─── Field health mini card ────────────────────────────────── */
function FieldMiniCard({ field, onClick }) {
  const health = field.health || 80;
  const color  = health >= 80 ? "var(--green)" : health >= 60 ? "var(--amber)" : "var(--red)";
  return (
    <div className="dash-field-mini" onClick={onClick}>
      <div className="dash-field-mini-top">
        <span className="dash-field-icon">{field.cropIcon || "🌾"}</span>
        <div>
          <p className="dash-field-name">{field.name}</p>
          <p className="dash-field-crop">{field.crop || "—"} · {field.acres || "—"} ac</p>
        </div>
        <span className="dash-field-health" style={{ color }}>
          {health >= 80 ? "✅" : health >= 60 ? "⚠️" : "🔴"} {health}%
        </span>
      </div>
      <div className="progress-track" style={{ marginTop: 10 }}>
        <div className="progress-fill" style={{ width: `${health}%`, background: color }} />
      </div>
    </div>
  );
}

/* ─── Main Dashboard ────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const { fields } = useContext(FieldContext);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const totalAcres  = fields.reduce((a, f) => a + (parseFloat(f.acres) || 0), 0);
  const cropCount   = [...new Set(fields.map(f => f.crop).filter(Boolean))].length;
  const avgHealth   = fields.length
    ? Math.round(fields.reduce((a, f) => a + (f.health || 80), 0) / fields.length)
    : 0;

  const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.includes(a.id));

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} />

      <div className={`page-main${collapsed ? " sidebar-collapsed" : ""}`}>
        <Navbar onToggle={() => setCollapsed(c => !c)} sidebarCollapsed={collapsed} />

        <div className="page-content">
          {/* ── Page header ── */}
          <div className="page-header">
            <div className="page-title-group">
              <p className="page-eyebrow">Good Morning ☀️</p>
              <h1 className="page-title">Hello, Ramesh!</h1>
              <p className="page-subtitle">Here's what's happening across your farm today.</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => navigate("/soil")}>
                🧪 Soil Report
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate("/irrigation")}>
                💧 Start Irrigation
              </button>
            </div>
          </div>

          {/* ── KPI Row ── */}
          <div className="dash-kpi-row">
            {[
              { icon: "🌾", label: "Total Fields",    value: fields.length,        suffix: "",    color: "#16a34a" },
              { icon: "📐", label: "Total Acres",      value: totalAcres.toFixed(1),suffix: " ac", color: "#0ea5e9" },
              { icon: "🌿", label: "Crop Varieties",   value: cropCount,            suffix: "",    color: "#8b5cf6" },
              { icon: "💚", label: "Avg Field Health", value: avgHealth,            suffix: "%",   color: "#e8a020" },
            ].map((kpi, i) => (
              <div className="dash-kpi-card" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="dash-kpi-icon" style={{ background: kpi.color + "18", color: kpi.color }}>
                  {kpi.icon}
                </div>
                <div>
                  <p className="dash-kpi-value" style={{ color: kpi.color }}>
                    <Counter value={parseFloat(kpi.value)} />{kpi.suffix}
                  </p>
                  <p className="dash-kpi-label">{kpi.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Main grid ── */}
          <div className="dash-grid">

            {/* Weather */}
            <div className="dash-grid-weather">
              <WeatherCard />
            </div>

            {/* Quick actions */}
            <div className="dash-grid-actions">
              <div className="card">
                <div className="card-header">
                  <p className="card-title">Quick Actions</p>
                </div>
                <div className="dash-quick-actions">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.path}
                      className="dash-qa-btn"
                      style={{ "--qa-color": a.color }}
                      onClick={() => navigate(a.path)}
                    >
                      <span className="dash-qa-icon">{a.icon}</span>
                      <span>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fields overview */}
            <div className="dash-grid-fields">
              <div className="card">
                <div className="card-header">
                  <p className="card-title">🌾 Your Fields</p>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate("/fields")}>
                    View All →
                  </button>
                </div>
                {fields.length === 0 ? (
                  <div className="dash-empty">
                    <p>No fields yet.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate("/profile")}>
                      + Add Field
                    </button>
                  </div>
                ) : (
                  <div className="dash-fields-list">
                    {fields.slice(0, 4).map(f => (
                      <FieldMiniCard
                        key={f.id}
                        field={f}
                        onClick={() => navigate("/fields")}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Alerts */}
            <div className="dash-grid-alerts">
              <div className="card">
                <div className="card-header">
                  <p className="card-title">🔔 Farm Alerts</p>
                  <span className="badge badge-amber">{visibleAlerts.length} active</span>
                </div>
                <div className="dash-alerts-list">
                  {visibleAlerts.map(alert => (
                    <div key={alert.id} className={`dash-alert dash-alert-${alert.type}`}>
                      <span className="dash-alert-icon">{alert.icon}</span>
                      <div className="dash-alert-body">
                        <p>{alert.text}</p>
                        <span>{alert.time}</span>
                      </div>
                      <button
                        className="dash-alert-close"
                        onClick={() => setDismissedAlerts(d => [...d, alert.id])}
                      >×</button>
                    </div>
                  ))}
                  {visibleAlerts.length === 0 && (
                    <div className="dash-empty">✅ No active alerts</div>
                  )}
                </div>
              </div>
            </div>

            {/* Market prices */}
            <div className="dash-grid-market">
              <div className="card">
                <div className="card-header">
                  <p className="card-title">📈 Mandi Prices</p>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate("/marketplace")}>
                    Marketplace →
                  </button>
                </div>
                <div className="dash-market-list">
                  {MARKET_PRICES.map(mp => (
                    <div key={mp.crop} className="dash-market-row">
                      <span className="dash-market-icon">{mp.icon}</span>
                      <div className="dash-market-info">
                        <p>{mp.crop}</p>
                        <span>per {mp.unit}</span>
                      </div>
                      <div className="dash-market-right">
                        <p className="dash-market-price">{mp.price}</p>
                        <span className={`badge ${mp.trend > 0 ? "badge-green" : "badge-red"}`}>
                          {mp.trend > 0 ? "▲" : "▼"} {Math.abs(mp.trend)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}