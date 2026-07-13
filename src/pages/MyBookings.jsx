import { FiCalendar, FiMapPin } from "react-icons/fi";

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">

            📅 My Bookings

          </h1>

          <p className="mt-4 text-lg text-green-100">

            Track your hostel visits and bookings.

          </p>

        </div>

      </div>

      {/* Booking Card */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">

                Campus View Hostel

              </h2>

              <div className="flex items-center gap-2 text-gray-500 mt-3">

                <FiMapPin />

                Kirinyaga University

              </div>

            </div>

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

              Confirmed

            </span>

          </div>

          <div className="mt-8 flex items-center gap-3">

            <FiCalendar className="text-green-600 text-2xl" />

            <div>

              <p className="font-semibold">

                Viewing Date

              </p>

              <p className="text-gray-500">

                12 July 2026 • 10:00 AM

              </p>

            </div>

          </div>

          <div className="mt-8 flex gap-4">

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">

              View Hostel

            </button>

            <button className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl font-semibold transition">

              Cancel Booking

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyBookings;