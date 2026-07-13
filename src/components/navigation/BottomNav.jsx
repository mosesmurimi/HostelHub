import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaUser } from "react-icons/fa";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t">

      <div className="flex justify-around py-4">

        <Link
         to="/" 
         className="text-green-600 text-2xl">
          <FaHome />
        </Link>

        <Link 
         to="/search"
         className="text-gray-500 text-2xl">
          <FaSearch />
        </Link>

        <Link
           to="/saved"
           className="text-gray-500 hover:text-red-500 transition"
        >
           <FaHeart size={24} />
         </Link>
        
        <Link 
         to="/dashboard"
         className="text-gray-500 text-2xl">
          <FaUser />
        
        </Link>

      </div>

    </div>
  );
};

export default BottomNav;