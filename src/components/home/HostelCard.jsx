import { FaWifi, FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const HostelCard = ({hostel}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

      {/* Hostel Image */}

      <img
        src={hostel.image}
        alt="Hostel"
        className="w-full h-56 object-cover"
      />

      {/* Card Content */}

      <div className="p-5">

        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {hostel.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 mt-2">

              <FiMapPin />

              <span>{hostel.location}</span>

            </div>

          </div>

          <div className="flex items-center gap-1 text-yellow-500">

            <FaStar />

            <span className="font-semibold">
              {hostel.rating}
            </span>

          </div>

        </div>

        {/* Amenities */}

        <div className="flex flex-wrap gap-3 mt-5">

  {hostel.amenities.map((item) => (

    <span
      key={item}
      className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
    >
         {item === "WiFi" && <FaWifi />}
      {item}
    </span>

  ))}

</div>

        {/* Bottom */}

        <div className="flex justify-between items-center mt-6">

          <div>

            <p className="text-gray-400 text-sm">
              Starting From
            </p>

            <h3 className="text-3xl font-bold text-green-600">

              KSh {hostel.price.toLocaleString()}

            </h3>

            <p className="text-gray-500 text-sm">
              per month
            </p>

          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">

            Book Now

          </button>

        </div>

      </div>

    </div>
  );
};

export default HostelCard;