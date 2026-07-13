import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}

        <div className="flex items-center gap-2">
          <FaHome className="text-3xl text-green-500" />

          <h1 className="text-3xl font-bold text-gray-800">
            HostelHub
          </h1>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <button className="text-2xl text-gray-700 hover:text-green-500 transition">
            <FiSearch />
          </button>
            
          <Link  to="/profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-11 h-11 rounded-full border-2 border-green-500"
          />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;