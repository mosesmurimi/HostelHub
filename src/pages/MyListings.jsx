import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import hostels from "../constants/hostels";

const MyListings = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            🏢 My Listings
          </h1>

          <p className="mt-4 text-green-100 text-lg">
            Manage all your hostel listings.
          </p>

        </div>

      </div>

      {/* Listings */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {hostels.map((hostel) => (

            <div
              key={hostel.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {hostel.name}
                </h2>

                <div className="mt-3">

  <span
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold

    ${
      hostel.status === "Active"
        ? "bg-green-100 text-green-700"

      : hostel.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"

      : "bg-red-100 text-red-700"
    }`}
  >

    {hostel.status === "Active" && <FaCheckCircle />}

    {hostel.status === "Pending" && <FaClock />}

    {hostel.status === "Fully Booked" && <FaTimesCircle />}

    {hostel.status}

  </span>

</div>

                <div className="flex items-center gap-2 text-gray-500 mt-3">

                  <FaMapMarkerAlt />

                  <span>{hostel.location}</span>

                </div>

                <h3 className="text-green-600 text-3xl font-bold mt-6">

                  KSh {hostel.price.toLocaleString()}

                </h3>

                {/* Buttons */}

                <div className="flex gap-4 mt-8">

                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition">

                    <FaEdit />

                    Edit

                  </button>

                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition">

                    <FaTrash />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyListings;