import React from "react";
import "../styles/global.css";

function Header({ title }) {
  return (
    <div className="header">
      <h2>{title}</h2>
    </div>
  );
}

export default Header;