import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CropRecommendation from "../pages/CropRecommendation";
import Marketplace from "../pages/Marketplace";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/crops" element={<CropRecommendation/>}/>
      <Route path="/market" element={<Marketplace/>}/>
    </Routes>
  );
}