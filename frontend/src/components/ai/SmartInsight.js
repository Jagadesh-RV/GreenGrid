export default function SmartInsight({ soil, weather }) {
  let msg = "System stable";

  if (soil < 30) msg = "Urgent irrigation needed";
  if (weather > 35) msg = "Heat stress risk detected";

  return (
    <div className="card">
      <h3>🧠 AI Insight</h3>
      <p>{msg}</p>
    </div>
  );
}