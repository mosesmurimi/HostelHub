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
      </Routes>
    </BrowserRouter>
  );
}

export default App;