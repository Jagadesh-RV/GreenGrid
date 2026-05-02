import React from "react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate("/dashboard")}>🏠</button>
      <button onClick={() => navigate("/market")}>🛒</button>
      <button onClick={() => navigate("/sell")}>📦</button>
      <button onClick={() => navigate("/profile")}>👤</button>
    </div>
  );
}

export default BottomNav;