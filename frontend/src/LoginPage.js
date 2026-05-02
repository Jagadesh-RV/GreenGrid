import React from "react";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="App">
      <div className="login-container">

        {/* TOP SECTION */}
        <div className="top-section">
          <div className="logo">🌱</div>
          <h1>GreenGrid AI</h1>
          <p className="subtitle">Smart Farming, Better Future</p>

          <img
            src="/assets/tractor.png"
            alt="farm"
            className="hero-img"
          />
        </div>

        {/* FORM SECTION */}
        <div className="form-section">
          <h2>Welcome Back!</h2>
          <p className="login-text">Login to continue</p>

          <div className="input-box">
            <span>📱</span>
            <input type="text" placeholder="Phone Number" />
          </div>

          <div className="input-box">
            <span>🔒</span>
            <input type="password" placeholder="Password" />
            <small className="forgot">Forgot?</small>
          </div>

          <button className="login-btn">Login</button>

          <div className="divider">or</div>

          <button className="google-btn">
            <span>🔵</span> Continue with Google
          </button>

          <p className="signup">``
            Don’t have an account? <span>Sign Up</span>
          </p>
        </div>

      </div>
    </div>
  );
}