import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Soil from "./pages/Soil";
import Irrigation from "./pages/Irrigation";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import FieldManagement from "./pages/FieldManagement";
import Recommendations from "./pages/Recommendations";
import CropManagement from "./pages/CropManagement";
import { Navigate } from "react-router-dom"; 
import CropDetails from "./pages/CropDetails";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/soil" element={<Soil />} />
        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fields" element={<FieldManagement />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/crops" element={<CropManagement />} />
        <Route path="/crop/:id" element={<CropDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;