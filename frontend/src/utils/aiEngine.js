export function getRecommendation(soil, weather) {
  if (soil < 30 && weather > 30) {
    return "⚠️ Irrigate immediately (High evaporation risk)";
  }
  if (soil < 40) {
    return "💧 Moderate irrigation recommended";
  }
  return "✅ Soil conditions stable";
}