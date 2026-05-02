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
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Soil" element={<Soil />} />
        <Route path="/Irrigation" element={<Irrigation />} />
        <Route path="/Marketplace" element={<Marketplace />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/FieldManagement" element={<FieldManagement />} />
        <Route path="/Recommendations" element={<Recommendations />} />
        <Route path="/Crops" element={<CropManagement />} />
        <Route path="/crop/:id" element={<CropDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;