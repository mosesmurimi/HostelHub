import {
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

import {

  collection,
} from "firebase/firestore";
import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";


const LandlordBookings = () => {

  const [bookings, setBookings] = useState([]);

const [loading, setLoading] = useState(true);



useEffect(() => {

  const fetchBookings = async () => {

    if (!auth.currentUser) return;

    try {

      const q = query(
        collection(db, "bookings"),
        where(
          "landlordId",
          "==",
          auth.currentUser.uid
        )
      );

      const snapshot = await getDocs(q);

      const bookingList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("LANDLORD BOOKINGS:", bookingList);

      setBookings(bookingList);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  fetchBookings();

}, []);


if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
      Loading bookings...
    </div>
  );
}


const approveBooking = async (bookingId) => {
  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      status: "Confirmed",
    });

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "Confirmed" }
          : booking
      )
    );

    alert("Booking approved!");
  } catch (error) {
    console.error(error);
    alert("Failed to approve booking.");
  }
};


const declineBooking = async (bookingId) => {
  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      status: "Declined",
    });

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "Declined" }
          : booking
      )
    );

    alert("Booking declined.");
  } catch (error) {
    console.error(error);
    alert("Failed to decline booking.");
  }
};
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

                  {booking.studentName}

                </h2>

                <p className="text-gray-500 mt-2">

                  {booking.hostelName}

                </p>

                <p className="text-green-600 font-bold mt-2">
                 KSh {booking.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-2 mt-4 text-gray-600">

                  <FaCalendarAlt />

                  {booking.bookingDate?.toDate().toLocaleString()}

                </div>

              </div>

              <span
              className={`px-5 py-2 rounded-full font-semibold

                  ${
                    booking.status === "Confirmed"
                    ? "bg-green-100 text-green-700"

                    : booking.status === "Declined"
                    ? "bg-red-100 text-red-700"

                    : "bg-yellow-100 text-yellow-700"
                  }`}
              >

                {booking.status}

              </span>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-8">

               {booking.status === "Pending" && (
                 <>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaUser />

                View Student

              </button>

              <button 
              onClick={() => approveBooking(booking.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaCheckCircle />

                Approve

              </button>

              <button 
               onClick={() => declineBooking(booking.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">

                <FaTimesCircle />

                Decline

              </button>

              </>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default LandlordBookings;