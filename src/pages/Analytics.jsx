import {
  FaTrophy,
  FaArrowTrendUp,
} from "react-icons/fa6";
import RevenuePieChart from "../components/analytics/RevenuePieChart";
import OccupancyChart from "../components/analytics/OccupancyChart";
import BookingsChart from "../components/analytics/BookingsChart";
import RevenueChart from "../components/analytics/RevenueChart";
import {
  FaMoneyBillWave,
  FaCalendarCheck,
  FaHome,
  FaUsers,
} from "react-icons/fa";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            📊 Analytics
          </h1>

          <p className="mt-4 text-green-100 text-lg">
            Track your hostel business performance.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaMoneyBillWave className="text-4xl text-green-600" />

            <h2 className="text-4xl font-bold mt-4">
              KSh 80,000
            </h2>

            <p className="text-gray-500 mt-2">
              Monthly Revenue
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaCalendarCheck className="text-4xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-4">
              23
            </h2>

            <p className="text-gray-500 mt-2">
              Bookings
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaHome className="text-4xl text-orange-500" />

            <h2 className="text-4xl font-bold mt-4">
              8
            </h2>

            <p className="text-gray-500 mt-2">
              Hostels
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaUsers className="text-4xl text-purple-600" />

            <h2 className="text-4xl font-bold mt-4">
              92%
            </h2>

            <p className="text-gray-500 mt-2">
              Occupancy
            </p>

          </div>

        </div>

                <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold">

            Revenue Overview

          </h2>

          <div className="mt-6">

          <RevenueChart />

          </div>

       <div className="mt-6">
        <BookingsChart/>
        </div>

         <div className="mt-6">
            <OccupancyChart/>
         </div>

         <div className="mt-6">
            <RevenuePieChart/>
         </div>


        </div>

                <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold">

            Top Performing Hostel

          </h2>

          <div className="mt-6">

            <h3 className="text-3xl font-bold">

              Campus View Hostel

            </h3>

            <p className="text-gray-500 mt-3">

              95% Occupancy

            </p>

            <p className="text-gray-500">

              KSh 40,000 Monthly Revenue

            </p>

          </div>

        </div>

                <div className="mt-10">

  <h2 className="text-3xl font-bold mb-8">

    Business Insights

  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Best Hostel */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <FaTrophy className="text-yellow-500 text-4xl mb-4" />

      <h3 className="font-bold text-xl">

        Best Hostel

      </h3>

      <p className="mt-3 text-green-600 font-semibold">

        Campus View Hostel

      </p>

      <p className="text-gray-500">

        95% Occupancy

      </p>

    </div>

    {/* Revenue */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />

      <h3 className="font-bold text-xl">

        Highest Revenue

      </h3>

      <p className="mt-3 text-green-600 font-semibold">

        KSh 80,000

      </p>

      <p className="text-gray-500">

        This Month

      </p>

    </div>

    {/* Growth */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <FaArrowTrendUp className="text-blue-600 text-4xl mb-4" />

      <h3 className="font-bold text-xl">

        Growth

      </h3>

      <p className="mt-3 text-blue-600 font-semibold">

        +18%

      </p>

      <p className="text-gray-500">

        Compared to Last Month

      </p>

    </div>

    {/* Occupancy */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <FaHome className="text-purple-600 text-4xl mb-4" />

      <h3 className="font-bold text-xl">

        Occupancy

      </h3>

      <p className="mt-3 text-purple-600 font-semibold">

        92%

      </p>

      <p className="text-gray-500">

        Across All Hostels

      </p>

    </div>

  </div>

</div>

      </div>

    </div>
  );
};

export default Analytics;