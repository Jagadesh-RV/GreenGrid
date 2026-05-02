import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/weather.css";

export default function Weather() {

  const [district, setDistrict] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "YOUR_OPENWEATHER_API_KEY";

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${district},IN&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <h2>🌦 Weather Insights</h2>

        <div className="weather-search">
          <input
            placeholder="Enter District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {weather && (
          <div className="weather-grid">
            {weather.list.slice(0, 6).map((w, i) => (
              <div key={i} className="weather-card">
                <p>{new Date(w.dt_txt).toLocaleString()}</p>
                <h3>{w.main.temp}°C</h3>
                <p>{w.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}