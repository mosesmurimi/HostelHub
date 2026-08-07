import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  FiSearch,
  FiHeart,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import HostelCard from "../components/home/HostelCard";
const Dashboard = () => {


  const user = auth.currentUser;

const [studentName, setStudentName] = useState("Student");
const [savedCount, setSavedCount] = useState(0);
const [bookingCount, setBookingCount] = useState(0);
const [approvedCount, setApprovedCount] = useState(0);
const [pendingCount, setPendingCount] = useState(0);
const [recentHostels, setRecentHostels] = useState([]);
const [recommendedHostels, setRecommendedHostels] = useState([]);




useEffect(() => {

  const fetchStudent = async () => {

    if (!user) return;

    try {

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setStudentName(docSnap.data().name);

      }

    } catch (error) {

      console.error(error);

    }

  };

  fetchStudent();

}, [user]);



useEffect(() => {

  const fetchSavedHostels = async () => {

    if (!user) return;

    try {

      const q = query(
        collection(db, "favorites"),
        where("studentId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      setSavedCount(snapshot.size);

      console.log("Saved Hostels:", snapshot.size);

    } catch (error) {

      console.error(error);

    }

  };

  fetchSavedHostels();

}, [user]);



useEffect(() => {

  const fetchBookings = async () => {

  if (!user) return;

  try {

    const q = query(
      collection(db, "bookings"),
      where("studentId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    setBookingCount(snapshot.size);

    let approved = 0;
    let pending = 0;

    snapshot.forEach((doc) => {

      const booking = doc.data();

      if (booking.status === "Confirmed") {

        approved++;

      }

      if (booking.status === "Pending") {

        pending++;

      }

    });

    setApprovedCount(approved);
    setPendingCount(pending);

    console.log("Student Bookings:", snapshot.size);

  } catch (error) {

    console.error(error);

  }

};

  fetchBookings();

}, [user]);


useEffect(() => {

  const fetchRecentlyViewed = async () => {

    if (!user) return;

    try {

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const viewedIds =
        userSnap.data().recentlyViewed || [];

      const hostelsData = [];

      for (const hostelId of viewedIds) {

        const hostelRef = doc(
          db,
          "hostels",
          hostelId
        );

        const hostelSnap = await getDoc(hostelRef);

        if (hostelSnap.exists()) {

          hostelsData.push({
            id: hostelSnap.id,
            ...hostelSnap.data(),
          });

        }

      }

      setRecentHostels(hostelsData);

    } catch (error) {

      console.error(
        "Error fetching recently viewed:",
        error
      );

    }

  };

  fetchRecentlyViewed();

}, [user]);


useEffect(() => {

  const fetchRecommended = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "hostels")
      );

      const allHostels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Newest first
      allHostels.sort((a, b) => {

        if (!a.createdAt || !b.createdAt) return 0;

        return (
          b.createdAt.seconds -
          a.createdAt.seconds
        );

      });

      setRecommendedHostels(
        allHostels.slice(0,3)
      );

    } catch (error) {

      console.error(
        "Error fetching recommendations:",
        error
      );

    }

  };

  fetchRecommended();

}, []);




  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-3xl text-white p-8 shadow-xl">

       <h1 className="text-4xl font-bold">

         Welcome back, {studentName}

      </h1>

         <p className="mt-3 text-lg">

        Ready to find your next hostel?

         </p>

    </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-gray-500">

               Saved Hostels

            </h2>

              <p className="text-4xl font-bold mt-3 text-green-600">

                {savedCount}

              </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-gray-500">

                Bookings

            </h2>

              <p className="text-4xl font-bold mt-3 text-green-600">

                   {bookingCount}

              </p>

        </div>

      
      <div className="bg-white rounded-3xl p-6 shadow-lg">

  <h2 className="text-gray-500">

    Approved

  </h2>

  <p className="text-4xl font-bold mt-3 text-green-600">

    {approvedCount}

  </p>

</div>

<div className="bg-white rounded-3xl p-6 shadow-lg">

  <h2 className="text-gray-500">

    Pending

  </h2>

  <p className="text-4xl font-bold mt-3 text-orange-500">

    {pendingCount}

  </p>

</div>
      </div>



<div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

<h2 className="text-2xl font-bold">

Quick Actions

</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

  <Link
    to="/"
    className="bg-green-50 hover:bg-green-100 rounded-2xl p-6 flex flex-col items-center transition duration-300 hover:scale-105"
  >
    <FiSearch className="text-4xl text-green-600" />
    <span className="mt-3 font-semibold">
      Search
    </span>
  </Link>

  <Link
    to="/saved"
    className="bg-red-50 hover:bg-red-100 rounded-2xl p-6 flex flex-col items-center transition duration-300 hover:scale-105"
  >
    <FiHeart className="text-4xl text-red-500" />
    <span className="mt-3 font-semibold">
      Saved
    </span>
  </Link>

  <Link
    to="/bookings"
    className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-6 flex flex-col items-center transition duration-300 hover:scale-105"
  >
    <FiCalendar className="text-4xl text-blue-600" />
    <span className="mt-3 font-semibold">
      Bookings
    </span>
  </Link>

  <Link
    to="/profile"
    className="bg-purple-50 hover:bg-purple-100 rounded-2xl p-6 flex flex-col items-center transition duration-300 hover:scale-105"
  >
    <FiUser className="text-4xl text-purple-600" />
    <span className="mt-3 font-semibold">
      Profile
    </span>
  </Link>

</div>

</div>


<div className="mt-12">
<h2 className="text-3xl font-bold mb-6">

Recently Viewed

</h2> 

 <div className="grid md:grid-cols-3 gap-8">

   {recentHostels.slice(-3).reverse().map((hostel) => (

  <HostelCard
    key={hostel.id}
    hostel={hostel}
  />

))}
  </div>

</div>


<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Recommended For You
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

   {recommendedHostels.map((hostel) => (

  <HostelCard
    key={hostel.id}
    hostel={hostel}
  />

))}

  </div>

</div>


</div>
  );
};

export default Dashboard;