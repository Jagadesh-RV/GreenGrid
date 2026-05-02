import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(item.path)}>
      <div className="card-icon">{item.icon}</div>
      <div className="card-title">{item.title}</div>
    </div>
  );
}

export default Card;