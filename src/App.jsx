import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analytics from "./pages/Analytics";
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

         <Route path="/dashboard" element={
                                           <ProtectedRoute>
                                           <Dashboard />
                                           </ProtectedRoute>
                                          }
          />

         <Route
  path="/saved"
  element={
    <ProtectedRoute>
      <SavedHostels />
    </ProtectedRoute>
  }
/>

         <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>

         <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
  path="/landlord-dashboard"
  element={
    <ProtectedRoute>
      <LandlordDashboard />
    </ProtectedRoute>
  }
/>

         <Route path="/add-hostel" element={<AddHostel />} />

         <Route path="/my-listings" element={<MyListings />} />

         <Route path="/landlord-bookings" element={<LandlordBookings />}/>

         <Route path="/analytics" element={<Analytics />} />

         <Route path="/register" element={<Register />} />

         <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;