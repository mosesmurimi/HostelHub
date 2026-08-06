
import { FaWifi, FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const HostelCard = ({hostel}) => {
  return (
    <Link to={`/hostel/${hostel.id}`}>
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

      {/* Hostel Image */}
    <div className="overflow-hidden">
      <img
        src={
    hostel.images?.[0] ||
    hostel.image ||
    "https://via.placeholder.com/500x300?text=No+Image"}
    alt={hostel.name}
          className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
      />
      </div>

      {/* Card Content */}

      <div className="p-5">

        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {hostel.name}
            </h2>


            <span
  className={`px-3 py-1 rounded-full text-xs font-semibold ${
    hostel.gender === "Boys"
      ? "bg-blue-100 text-blue-700"
      : hostel.gender === "Girls"
      ? "bg-pink-100 text-pink-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {hostel.gender === "Both"
    ? "👫 Boys & Girls"
    : hostel.gender}
</span>



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
      className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm flex items-center gap-2"
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

          <div className="mt-4 space-y-2">

  <p className="text-gray-700 font-semibold">

    🏠 {hostel.roomType}

  </p>

  {hostel.availableRooms > 0 ? (

    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">

      🟢 {hostel.availableRooms} Rooms Available

    </span>

  ) : (

    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">

      🔴 Fully Booked

    </span>

  )}

</div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">

            Book Now

          </button>

        </div>

      </div>

    </div>

    </Link>
  );
};
  export default HostelCard;