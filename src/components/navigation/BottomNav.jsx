import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaUser } from "react-icons/fa";

const BottomNav = () => {



  const navigate = useNavigate();
const location = useLocation();



  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t">

      <div className="flex justify-around py-4">

        <Link
  to="/"
  className="text-green-600 text-2xl hover:text-green-700 transition duration-200"
>
  <FaHome />
</Link>



<button
  onClick={() => {

    if (location.pathname !== "/") {

      navigate("/");

      setTimeout(() => {

        document
          .getElementById("search")
          ?.scrollIntoView({
            behavior: "smooth",
          });

      }, 150);

    } else {

      document
        .getElementById("search")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }

  }}
  className="text-gray-500 text-2xl hover:text-green-600 transition duration-200"
>

  <FaSearch />

</button>



<Link
  to="/saved"
  className="text-gray-500 text-2xl hover:text-green-600 transition duration-200"
>
  <FaHeart />
</Link>

<Link
  to="/dashboard"
  className="text-gray-500 text-2xl hover:text-green-600 transition duration-200"
>
  <FaUser />
</Link>

      </div>

    </div>
  );
};

export default BottomNav;