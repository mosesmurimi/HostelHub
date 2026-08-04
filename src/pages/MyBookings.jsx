import { deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { FaCalendarCheck } from "react-icons/fa";

const Bookings = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBookings = async () => {

      if (!auth.currentUser) return;

      try {

        const q = query(
          collection(db, "bookings"),
          where("studentId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);



  const cancelBooking = async (bookingId) => {

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {

    await deleteDoc(doc(db, "bookings", bookingId));

    setBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId)
    );

    alert("Booking cancelled successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to cancel booking.");

  }

};
  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">

            📅 My Bookings

          </h1>

          <p className="mt-3 text-green-100">

            All your hostel booking requests.

          </p>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {loading ? (

          <p>Loading...</p>

        ) : bookings.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <FaCalendarCheck className="text-6xl text-gray-400 mx-auto"/>

            <h2 className="text-2xl font-bold mt-6">

              No bookings yet

            </h2>

            <p className="text-gray-500 mt-3">

              Book a hostel and it will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-lg p-8"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {booking.hostelName}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      📍 {booking.hostelLocation}

                    </p>

                    <p className="mt-2">

                      💰 KSh {booking.price?.toLocaleString()}/month

                    </p>

                    <p className="mt-2 text-gray-500">

                      {booking.bookingDate?.toDate().toLocaleString()}

                    </p>

<div className="flex gap-4 mt-6">

  <Link
    to={`/hostel/${booking.hostelId}`}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
  >
    View Hostel
  </Link>

  {booking.status === "Pending" && (

    <button
      onClick={() => cancelBooking(booking.id)}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
    >
      Cancel Booking
    </button>

  )}

</div>


                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold ${
                      booking.status === "Pending"
                        ? "bg-yellow-500"
                        : booking.status === "Confirmed"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >

                    {booking.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default Bookings;