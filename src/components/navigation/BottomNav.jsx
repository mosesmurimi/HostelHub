import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaUser } from "react-icons/fa";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t">

      <div className="flex justify-around py-4">

        <button className="text-green-600 text-2xl">
          <FaHome />
        </button>

        <button className="text-gray-500 text-2xl">
          <FaSearch />
        </button>

        <button className="text-gray-500 text-2xl">
          <FaHeart />
        </button>
        
        <Link to="/dashboard">
        <button className="text-gray-500 text-2xl">
          <FaUser />
        </button>
        </Link>

      </div>

    </div>
  );
};

export default BottomNav;