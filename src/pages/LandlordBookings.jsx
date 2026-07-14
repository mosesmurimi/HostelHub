import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const bookings = [
  {
    id: 1,
    student: "Brian Maina",
    hostel: "Campus View Hostel",
    date: "12 July 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    student: "Mercy Wanjiku",
    hostel: "Royal Heights",
    date: "15 July 2026",
    time: "2:00 PM",
    status: "Pending",
  },
];

const LandlordBookings = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            📅 Bookings
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Manage student viewing requests.
          </p>

        </div>

      </div>

      {/* Booking Cards */}

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">

                  {booking.student}

                </h2>

                <p className="text-gray-500 mt-2">

                  {booking.hostel}

                </p>

                <div className="flex items-center gap-2 mt-4 text-gray-600">

                  <FaCalendarAlt />

                  {booking.date} • {booking.time}

                </div>

              </div>

              <span
                className={`px-5 py-2 rounded-full font-semibold

                ${
                  booking.status === "Confirmed"

                    ? "bg-green-100 text-green-700"

                    : "bg-yellow-100 text-yellow-700"
                }`}
              >

                {booking.status}

              </span>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-8">

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaUser />

                View Student

              </button>

              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaCheckCircle />

                Approve

              </button>

              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaTimesCircle />

                Decline

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default LandlordBookings;