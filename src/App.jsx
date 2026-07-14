import LandlordBookings from "./pages/LandlordBookings";
import MyListings from "./pages/MyListings";
import AddHostel from "./pages/AddHostel";
import LandlordDashboard from "./pages/LandlordDashboard";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import SavedHostels from "./pages/SavedHostels";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";
import HostelDetails from "./pages/HostelDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/hostel/:id"
          element={<HostelDetails />}
        />

         <Route path="/dashboard" element={<Dashboard />} />

         <Route path="/saved" element={<SavedHostels />} />

         <Route path="/bookings" element={<MyBookings />} />

         <Route path="/profile" element={<Profile />} />

         <Route path="/landlord-dashboard" element={<LandlordDashboard />}/>

         <Route path="/add-hostel" element={<AddHostel />} />

         <Route path="/my-listings" element={<MyListings />} />

         <Route path="/landlord-bookings" element={<LandlordBookings />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;