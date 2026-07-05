import { FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const PopularCard = ({ hostel }) => {
  return (
    <div className="min-w-75 bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={hostel.image}
        alt={hostel.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h2 className="font-bold text-xl">
            {hostel.name}
          </h2>

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            {hostel.rating}
          </div>

        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-2">

          <FiMapPin />

          <span>{hostel.location}</span>

        </div>

        <h3 className="text-2xl font-bold text-green-600 mt-4">

          KSh {hostel.price.toLocaleString()}

        </h3>

      </div>

    </div>
  );
};

export default PopularCard;