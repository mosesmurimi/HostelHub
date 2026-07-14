import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBed,
  FaPlus,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

const LandlordDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">

            🏢 Landlord Dashboard

          </h1>

          <p className="mt-4 text-green-100 text-lg">

            Welcome back, Moses.

          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaHome className="text-4xl text-green-600" />

            <h2 className="text-4xl font-bold mt-4">

              8

            </h2>

            <p className="text-gray-500">

              My Hostels

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaCalendarCheck className="text-4xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-4">

              23

            </h2>

            <p className="text-gray-500">

              Bookings

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaBed className="text-4xl text-orange-500" />

            <h2 className="text-4xl font-bold mt-4">

              92%

            </h2>

            <p className="text-gray-500">

              Occupancy

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaMoneyBillWave className="text-4xl text-green-600" />

            <h2 className="text-4xl font-bold mt-4">

              KSh 80K

            </h2>

            <p className="text-gray-500">

              Revenue

            </p>

          </div>

        </div>

                {/* Quick Actions */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold">

            Quick Actions

          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <Link
             to="/add-hostel"
             className="bg-green-600 text-white rounded-2xl p-6 hover:bg-green-700 transition">

              <FaPlus className="mx-auto text-3xl" />

              <p className="mt-3">

                Add Hostel

              </p>

            </Link>

            <Link
            to="/my-listings"
            className="bg-blue-600 text-white rounded-2xl p-6 hover:bg-blue-700 transition">

              <FaClipboardList className="mx-auto text-3xl" />

              <p className="mt-3">

                My Listings

              </p>

            </Link>

            <Link
             to="/landlord-bookings"
             className="bg-orange-500 text-white rounded-2xl p-6 hover:bg-orange-600 transition">

              <FaCalendarCheck className="mx-auto text-3xl" />

              <p className="mt-3">

                Bookings

              </p>

            </Link>

            <button className="bg-purple-600 text-white rounded-2xl p-6 hover:bg-purple-700 transition">

              <FaChartBar className="mx-auto text-3xl" />

              <p className="mt-3">

                Analytics

              </p>

            </button>

          </div>

        </div>

                {/* Recent Booking */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold">

            Recent Booking

          </h2>

          <div className="mt-6">

            <h3 className="text-xl font-semibold">

              Campus View Hostel

            </h3>

            <p className="text-gray-500 mt-2">

              Student: Brian Maina

            </p>

            <p className="text-gray-500">

              Viewing Tomorrow • 10:00 AM

            </p>

            <span className="inline-block mt-5 bg-green-100 text-green-700 px-5 py-2 rounded-full">

              Confirmed

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LandlordDashboard;