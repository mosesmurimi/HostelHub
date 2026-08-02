import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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
const user = auth.currentUser;

const [landlordName, setLandlordName] = useState("Landlord");
const [hostelCount, setHostelCount] = useState(0);
const [bookingCount, setBookingCount] = useState(0);
const [occupancy, setOccupancy] = useState(0);
const [revenue, setRevenue] = useState(0);
const [recentBooking, setRecentBooking] = useState(null);



useEffect(() => {
const fetchOccupancy = async () => {

  if (!auth.currentUser) return;

  try {

    const q = query(
      collection(db, "hostels"),
      where("ownerId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    let totalRooms = 0;
    let occupiedRooms = 0;

    snapshot.forEach((doc) => {

      const hostel = doc.data();

      totalRooms += Number(hostel.totalRooms || 0);

      occupiedRooms += Number(hostel.occupiedRooms || 0);

    });

    console.log("Total Rooms:", totalRooms);

    console.log("Occupied Rooms:", occupiedRooms);

    const percent =
      totalRooms > 0
        ? Math.round((occupiedRooms / totalRooms) * 100)
        : 0;

    setOccupancy(percent);

  } catch (error) {

    console.error(error);

  }

};
fetchOccupancy();
}, []);



useEffect(() => {
  const fetchBookingCount = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, "bookings"),
        where("landlordId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      setBookingCount(snapshot.size);

      console.log("Total bookings:", snapshot.size);

    } catch (error) {
      console.error(error);
    }
  };

  fetchBookingCount();
}, []);

useEffect(() => {

  const fetchHostels = async () => {

  const q = query(
    collection(db, "hostels"),
    where("ownerId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  setHostelCount(snapshot.size);

  let revenue = 0;

  snapshot.forEach((doc) => {

    const hostel = doc.data();

    const occupiedRooms =
      (hostel.totalRooms || 0) -
      (hostel.availableRooms || 0);

    revenue += occupiedRooms * (hostel.price || 0);

  });

  setRevenue(revenue);

   };


  const fetchLandlord = async () => {

    if (!user) return;

    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLandlordName(docSnap.data().name);
    }

  };

  const fetchRecentBooking = async () => {

  if (!user) return;

  try {

    const q = query(
      collection(db, "bookings"),
      where("landlordId", "==", user.uid),
      orderBy("bookingDate", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

      setRecentBooking({
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      });

    }

  } catch (error) {

    console.error(error);

  }

};


   fetchHostels();
  fetchLandlord();
  fetchRecentBooking();

}, [user]);
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">

            🏢 Landlord Dashboard

          </h1>

          <p className="mt-4 text-green-100 text-lg">

            Welcome back, {landlordName}.

          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaHome className="text-4xl text-green-600" />

            <h2 className="text-4xl font-bold mt-4">

              {hostelCount}

            </h2>

            <p className="text-gray-500">

              My Hostels

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaCalendarCheck className="text-4xl text-blue-600" />

            <h2 className="text-4xl font-bold mt-4">

              {bookingCount}

            </h2>

            <p className="text-gray-500">

              Bookings

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaBed className="text-4xl text-orange-500" />

            <h2 className="text-4xl font-bold mt-4">

              {occupancy}%

            </h2>

            <p className="text-gray-500">

              Occupancy

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <FaMoneyBillWave className="text-4xl text-green-600" />

            <h2 className="text-4xl font-bold mt-4">

              KSh {revenue.toLocaleString()}

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

            <Link
                to="/analytics"
                className="bg-purple-600 text-white rounded-2xl p-6 hover:bg-purple-700 transition">

              <FaChartBar className="mx-auto text-3xl" />

              <p className="mt-3">

                Analytics

              </p>

            </Link>

          </div>

        </div>

            
{/* Recent Booking */}

<div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

  <h2 className="text-2xl font-bold">
    Recent Booking
  </h2>

  {recentBooking ? (

    <div className="mt-6">

      <h3 className="text-2xl font-bold">
        {recentBooking.studentName}
      </h3>

      <p className="text-gray-500 mt-2">
        {recentBooking.hostelName}
      </p>

      <p className="mt-3">

        <strong>Status:</strong>{" "}

        <span
          className={`font-semibold ${
            recentBooking.status === "Confirmed"
              ? "text-green-600"
              : recentBooking.status === "Declined"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {recentBooking.status}
        </span>

      </p>

      <p className="text-gray-500 mt-4">
        📅{" "}
        {recentBooking.bookingDate
          ?.toDate()
          .toLocaleString()}
      </p>

    </div>

  ) : (

    <p className="text-gray-500 mt-6">
      No bookings yet.
    </p>

  )}

</div>
      
 
        
      </div>

    </div>
  );
};

export default LandlordDashboard;