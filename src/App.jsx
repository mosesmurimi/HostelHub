import { BrowserRouter, Routes, Route } from "react-router-dom";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;