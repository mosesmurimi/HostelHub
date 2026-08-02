import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
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

  const [analytics, setAnalytics] = useState({

  bestHostel: "None",

  bestOccupancy: 0,

  highestRevenue: 0,

  overallOccupancy: 0,

  growth: 0,

});


  const [stats, setStats] = useState({

  revenue: 0,

  bookings: 0,

  hostels: 0,

  occupancy: 0,

});


useEffect(() => {

  const fetchAnalytics = async () => {

    if (!auth.currentUser) return;

    try {

      const hostelQuery = query(
        collection(db, "hostels"),
        where("ownerId", "==", auth.currentUser.uid)
      );

      const bookingQuery = query(
        collection(db, "bookings"),
        where("landlordId", "==", auth.currentUser.uid)
      );

      const hostelSnapshot = await getDocs(hostelQuery);

      const bookingSnapshot = await getDocs(bookingQuery);

      let totalRooms = 0;

      let occupiedRooms = 0;

      let bestHostel = "";

      let bestOccupancy = 0;

      hostelSnapshot.forEach((doc) => {

        const hostel = doc.data();

        const total = Number(hostel.totalRooms || 0);

        const occupied = Number(hostel.occupiedRooms || 0);

        totalRooms += total;

        occupiedRooms += occupied;

        const occupancy =
          total > 0
            ? (occupied / total) * 100
            : 0;

        if (occupancy > bestOccupancy) {

          bestOccupancy = occupancy;

          bestHostel = hostel.name;

        }

      });

      let highestRevenue = 0;

      const monthlyRevenue = new Array(12).fill(0);

      bookingSnapshot.forEach((doc) => {

        const booking = doc.data();

        if (booking.status === "Confirmed") {

          highestRevenue += Number(
            booking.price || 0
          );

          if (booking.bookingDate) {

            const month =
              booking.bookingDate
                .toDate()
                .getMonth();

            monthlyRevenue[month] += Number(
              booking.price || 0
            );

          }

        }

      });

      const currentMonth =
        new Date().getMonth();

      const previousMonth =
        currentMonth === 0
          ? 11
          : currentMonth - 1;

      const currentRevenue =
        monthlyRevenue[currentMonth];

      const previousRevenue =
        monthlyRevenue[previousMonth];

      const growth =
        previousRevenue > 0

          ? (
              ((currentRevenue -
                previousRevenue) /
                previousRevenue) *
              100
            ).toFixed(1)

          : 0;

      const overallOccupancy =
        totalRooms > 0

          ? Math.round(
              (occupiedRooms / totalRooms) *
                100
            )

          : 0;

      setAnalytics({

        bestHostel,

        bestOccupancy:
          Math.round(bestOccupancy),

        highestRevenue,

        overallOccupancy,

        growth,

      });

    } catch (error) {

      console.error(error);

    }

  };

  fetchAnalytics();

}, []);




useEffect(() => {

  const fetchAnalytics = async () => {

    if (!auth.currentUser) return;

    try {

        const hostelQuery = query(
            collection(db,"hostels"),
            where("ownerId","==",auth.currentUser.uid)
        );

        const hostelSnapshot = await getDocs(hostelQuery);

        const bookingQuery = query(
            collection(db,"bookings"),
            where("landlordId","==",auth.currentUser.uid)
        );

        const bookingSnapshot = await getDocs(bookingQuery);

        let revenue = 0;

        let totalRooms = 0;

        let occupiedRooms = 0;

        hostelSnapshot.forEach(doc=>{

            const hostel = doc.data();

            totalRooms += Number(hostel.totalRooms || 0);

            occupiedRooms += Number(hostel.occupiedRooms || 0);

        });

        bookingSnapshot.forEach(doc=>{

            const booking = doc.data();

            if(booking.status==="Confirmed"){

                revenue += Number(booking.price);

            }

        });

        const occupancy =

            totalRooms>0

            ? Math.round((occupiedRooms/totalRooms)*100)

            :0;

        setStats({

            revenue,

            bookings: bookingSnapshot.size,

            hostels: hostelSnapshot.size,

            occupancy,

        });

    }

    catch(error){

        console.error(error);

    }

};

fetchAnalytics();

}, []);



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
              KSh {stats.revenue.toLocaleString()}
            </h2>

            <p className="text-gray-500 mt-2">
              Monthly Revenue
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaCalendarCheck className="text-4xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-4">
              {stats.bookings}
            </h2>

            <p className="text-gray-500 mt-2">
              Bookings
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaHome className="text-4xl text-orange-500" />

            <h2 className="text-4xl font-bold mt-4">
              {stats.hostels}
            </h2>

            <p className="text-gray-500 mt-2">
              Hostels
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <FaUsers className="text-4xl text-purple-600" />

            <h2 className="text-4xl font-bold mt-4">
              {stats.occupancy}%
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

              {analytics.bestHostel}

            </h3>

            <p className="text-gray-500 mt-3">

              {analytics.bestOccupancy}% Occupancy

            </p>

            <p className="text-gray-500">

              KSh {analytics.highestRevenue.toLocaleString()} Total Revenue

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

        {analytics.bestHostel}

      </p>

      <p className="text-gray-500">

        {analytics.bestOccupancy}% Occupancy

      </p>

    </div>

    {/* Revenue */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />

      <h3 className="font-bold text-xl">

        Highest Revenue

      </h3>

      <p className="mt-3 text-green-600 font-semibold">

        KSh {analytics.highestRevenue.toLocaleString()}

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

        {analytics.growth}%

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

        {analytics.overallOccupancy}%

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