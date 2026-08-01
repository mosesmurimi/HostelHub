import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";

const MyListings = () => {

  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (listingId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this hostel listing?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await deleteDoc(doc(db, "hostels", listingId));

    // Remove the deleted listing from the screen immediately
    setListings((previousListings) =>
      previousListings.filter(
        (listing) => listing.id !== listingId
      )
    );

    alert("Hostel listing deleted successfully.");

  } catch (error) {
    console.error("Error deleting hostel:", error);

    alert(
      "Failed to delete the hostel. Please try again."
    );
  }
};

  useEffect(() => {

    const fetchMyListings = async () => {

      try {

        const user = auth.currentUser;

        if (!user) {
          console.log("No landlord logged in.");
          setLoading(false);
          return;
        }

        console.log(
          "Fetching listings for landlord:",
          user.uid
        );

        const listingsQuery = query(
          collection(db, "hostels"),
          where("ownerId", "==", user.uid)
        );

        const querySnapshot = await getDocs(
          listingsQuery
        );

        const listingsData = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        console.log(
          "MY LISTINGS:",
          listingsData
        );

        setListings(listingsData);

      } catch (error) {

        console.error(
          "Error fetching my listings:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchMyListings();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl">
            ⏳
          </div>

          <p className="mt-4 text-gray-600 text-lg">
            Loading your listings...
          </p>

        </div>

      </div>
    );

  }

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

        {listings.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <h2 className="text-3xl font-bold">
              You don't have any listings yet.
            </h2>

            <p className="text-gray-500 mt-4">
              Add your first hostel and start reaching students.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {listings.map((hostel) => (

              <div
                key={hostel.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >

                {/* Image */}

                <img
                   src={
                     hostel.images?.[0] ||
                     hostel.image ||
                     "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
                   }
                  alt={hostel.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  {/* Name */}

                  <h2 className="text-2xl font-bold">
                    {hostel.name}
                  </h2>

                  {/* Status */}

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

                      {hostel.status === "Active" && (
                        <FaCheckCircle />
                      )}

                      {hostel.status === "Pending" && (
                        <FaClock />
                      )}

                      {hostel.status === "Fully Booked" && (
                        <FaTimesCircle />
                      )}

                      {hostel.status || "Active"}

                    </span>

                  </div>

                  {/* Location */}

                  <div className="flex items-center gap-2 text-gray-500 mt-3">

                    <FaMapMarkerAlt />

                    <span>
                      {hostel.location}
                    </span>

                  </div>

                  {/* Price */}

                  <h3 className="text-green-600 text-3xl font-bold mt-6">

                    KSh{" "}

                    {Number(hostel.price || 0).toLocaleString()}

                  </h3>

                  {/* Buttons */}

                  <div className="flex gap-4 mt-8">

                    <button
                     onClick={() =>
                             navigate(`/edit-hostel/${hostel.id}`)
                           }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
                    >

                      <FaEdit />

                      Edit

                    </button>

                <button
  onClick={() => handleDelete(hostel.id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
>
  <FaTrash />
  Delete
</button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default MyListings;