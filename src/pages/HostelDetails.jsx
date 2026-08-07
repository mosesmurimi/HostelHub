import { FaRegHeart } from "react-icons/fa";
import {
  FaBed,
  FaDoorOpen,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import HostelCard from "../components/home/HostelCard";
import {
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { 
  doc, 
  getDoc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
 } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { auth } from "../firebase/firebase";

import {
  FaWifi,
  FaParking,
  FaShieldAlt,
  FaBolt,
  FaTint,
} from "react-icons/fa";

const HostelDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [hostel, setHostel] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  const [listingCount, setListingCount] = useState(0);

  const [similarHostels, setSimilarHostels] = useState([]);

  const [saved, setSaved] = useState(false);

  const [landlord, setLandlord] = useState(null);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [submittingReview, setSubmittingReview] = useState(false);

  const [reviews, setReviews] = useState([]);





useEffect(() => {

  const checkSaved = async () => {

    if (!auth.currentUser || !hostel) return;

    const favoriteRef = doc(
      db,
      "favorites",
      `${auth.currentUser.uid}_${hostel.id}`
    );

    const snap = await getDoc(favoriteRef);

    setSaved(snap.exists());

  };

  checkSaved();

}, [hostel]);




  useEffect(() => {

    const fetchHostel = async () => {

      try {

        const hostelRef = doc(db, "hostels", id);

        const hostelSnapshot = await getDoc(hostelRef);

        if (hostelSnapshot.exists()) {

          const hostelData = {
            id: hostelSnapshot.id,
            ...hostelSnapshot.data(),
          };

          setHostel(hostelData);

          setSelectedImage(
            hostelData.image || ""
          );



       

// Save recently viewed hostel
if (auth.currentUser) {

   console.log("Current User:", auth.currentUser.uid);
  const userRef = doc(
    db,
    "users",
    auth.currentUser.uid
  );

   console.log("Updating user document...");

  await updateDoc(userRef, {

    recentlyViewed: arrayUnion(
      hostelSnapshot.id
    ),

  });

   console.log("Recently viewed updated successfully!");

}



        }

      } catch (error) {

        console.error(
          "Error fetching hostel:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchHostel();

  }, [id]);



  useEffect(() => {

  const fetchLandlord = async () => {

    if (!hostel?.ownerId) return;

    try {

      console.log("Hostel ownerId:", hostel?.ownerId);

      const landlordRef = doc(db, "users", hostel.ownerId);

      const landlordSnap = await getDoc(landlordRef);

      console.log("Landlord exists:", landlordSnap.exists());

      if (landlordSnap.exists()) {

         console.log("Landlord data:", landlordSnap.data());

        setLandlord(landlordSnap.data());

      }


      const hostelSnapshot = await getDocs(collection(db, "hostels"));

const listings = hostelSnapshot.docs.filter(
  (doc) => doc.data().ownerId === hostel.ownerId
);

setListingCount(listings.length);


    } catch (error) {

      console.error("Error fetching landlord:", error);

    }

  };

  fetchLandlord();

}, [hostel]);



useEffect(() => {

  const fetchReviews = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "reviews")
      );

      const hostelReviews = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          review => review.hostelId === hostel.id
        );

      setReviews(hostelReviews);

    } catch (error) {

      console.error("Error fetching reviews:", error);

    }

  };

  if (hostel) {

    fetchReviews();

  }

}, [hostel]);






  useEffect(() => {
  const fetchSimilarHostels = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "hostels")
      );

      const allHostels = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredHostels = allHostels
        .filter((item) => item.id !== id)
        .slice(0, 3);

      setSimilarHostels(filteredHostels);

    } catch (error) {
      console.error(
        "Error fetching similar hostels:",
        error
      );
    }
  };

  fetchSimilarHostels();

}, [id]);


const toggleSaved = async () => {

  if (!auth.currentUser) {
    alert("Please login first.");
    return;
  }

  const favoriteRef = doc(
    db,
    "favorites",
    `${auth.currentUser.uid}_${hostel.id}`
  );

  const hostelRef = doc(
    db,
    "hostels",
    hostel.id
  );

  if (saved) {

    // Remove favorite
    await deleteDoc(favoriteRef);

    // Decrease save count
    await updateDoc(hostelRef, {
      savedCount: increment(-1),
    });

    setSaved(false);

  } else {

    // Save favorite
    await setDoc(favoriteRef, {
      studentId: auth.currentUser.uid,
      hostelId: hostel.id,
      savedAt: new Date(),
    });

    // Increase save count
    await updateDoc(hostelRef, {
      savedCount: increment(1),
    });

    setSaved(true);

  }

};



const handleWhatsApp = () => {

  if (!landlord?.phone) {
    alert("Landlord phone number not available.");
    return;
  }

  const message = `Hello ${landlord.name},

I found your hostel "${hostel.name}" located in ${hostel.location} on HostelHub.

Is it still available?`;

  const whatsappUrl = `https://wa.me/${landlord.phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");

};





const handleBooking = async () => {

  console.log("✅ BOOK BUTTON CLICKED");

  if (!auth.currentUser) {
    alert("Please login first.");
    return;
  }

  try {

    console.log("Fetching student profile...");

    const studentRef = doc(db, "users", auth.currentUser.uid);

    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      alert("Student profile not found.");
      return;
    }

    const studentData = studentSnap.data();

    console.log("Student:", studentData);

    console.log("Hostel:", hostel);

    console.log("🚀 About to save booking");



    await addDoc(collection(db, "bookings"), {

      studentId: auth.currentUser.uid,

      studentName: studentData.name,

      studentEmail: studentData.email,

      landlordId: hostel.ownerId,

      hostelId: hostel.id,

      hostelName: hostel.name,

      hostelLocation: hostel.location,

      price: hostel.price,

      status: "Pending",

      bookingDate: serverTimestamp(),

    });

    

    alert("Booking submitted successfully!");

  } catch (error) {

    console.error("❌ BOOKING ERROR:", error);

    alert(error.message);

  }

};



const handleReviewSubmit = async () => {

  if (!auth.currentUser) {
    alert("Please login first.");
    return;
  }

  if (!comment.trim()) {
    alert("Please write a review.");
    return;
  }

  try {

    setSubmittingReview(true);

    // Fetch current student's profile
    const studentRef = doc(
      db,
      "users",
      auth.currentUser.uid
    );

    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      alert("Student profile not found.");
      return;
    }

    const student = studentSnap.data();

    // Save review
    await addDoc(collection(db, "reviews"), {

      hostelId: hostel.id,

      studentId: auth.currentUser.uid,

      studentName: student.name,

      studentProfile:
        student.profileImage || "",

      rating,

      comment,

      createdAt: serverTimestamp(),

    });


    setReviews((previous) => [

  ...previous,

  {

    studentName: student.name,

    studentProfile: student.profileImage || "",

    rating,

    comment,

  },

]);

    alert("Review submitted successfully!");

    // Clear form

    setRating(5);

    setComment("");

  } catch (error) {

    console.error(error);

    alert("Failed to submit review.");

  } finally {

    setSubmittingReview(false);

  }

};




  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold text-gray-600">

          Loading hostel...

        </h2>

      </div>
    );

  }


  if (!hostel) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h2 className="text-3xl font-bold text-red-500">

          Hostel not found

        </h2>

        <Link
          to="/"
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
        >

          Back to Home

        </Link>

      </div>
    );

  }
  return (
    <div className="max-w-5xl mx-auto p-8">

      <Link
  to="/"
  className="inline-flex items-center gap-2 mb-6 text-green-600 font-semibold hover:underline"
>
  <FiArrowLeft />
  Back to Home
</Link>

  <div className="relative">

  <img
  src={
    selectedImage ||
    hostel.images?.[0] ||
    hostel.image ||
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
  }
  alt={hostel.name}
  className="w-full h-96 object-cover rounded-3xl transition-all duration-500 hover:scale-[1.02]"
/>


<div className="grid grid-cols-4 gap-4 mt-5">

  {(hostel.images?.length > 0
    ? hostel.images
    : hostel.image
      ? [hostel.image]
      : []
  ).map((image, index) => (

    <img
      key={index}
      src={image}
      alt={`${hostel.name} ${index + 1}`}
      onClick={() => setSelectedImage(image)}
      className={`h-28 w-full object-cover rounded-xl cursor-pointer border-4 ${
        selectedImage === image
          ? "border-green-600"
          : "border-transparent"
      }`}
    />

  ))}

</div>

  <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>

  <div className="absolute bottom-8 left-8 text-white">

    <h1 className="text-5xl font-bold">
      {hostel.name}
    </h1>

    

    {hostel.availableRooms > 0 ? (

  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mt-4">

    🟢 Rooms Available

  </span>

) : (

  <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold mt-4">

    🔴 Fully Booked

  </span>

)}

    <p className="text-xl mt-2">
      {hostel.location}
    </p>

     <p className="text-xl mt-2">

      Near {hostel.university}

    </p>

  </div>

</div>

  <div className="bg-white shadow-xl rounded-3xl p-8 mt-8">

  <div className="flex justify-between items-center">

    <div>

      <div className="flex items-center gap-2 text-yellow-500 mb-3">

        ⭐

        <span className="font-semibold text-lg">

          {hostel.rating}

        </span>

      </div>

      <p className="text-gray-500">

        Starting From

      </p>

      <h2 className="text-4xl font-bold text-green-600">

        KSh{" "}
{hostel.price
  ? Number(hostel.price).toLocaleString()
  : "Price unavailable"}

      </h2>

      <p className="text-gray-500">

        per month

      </p>

    </div>

    <button
    onClick={handleBooking}
     className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition">

      Book Viewing

    </button>

  </div>

</div>

 <div className="flex justify-end mt-6">

<button
  onClick={toggleSaved}
  className="flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-6 py-3 rounded-xl"
>

  {saved ? (
    <FaHeart className="text-red-500 text-xl" />
  ) : (
    <FaRegHeart className="text-red-500 text-xl" />
  )}

  <span>
    {saved ? "Saved" : "Save Hostel"}
  </span>

</button>

</div>

  <div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800">

        About this Hostel

    </h2>

    <p className="mt-4 text-gray-600 leading-8">

        {hostel.description}

    </p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Hostel Information
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="flex items-center gap-4">

      <div className="bg-green-100 p-4 rounded-full">

        <FaBed className="text-green-600 text-2xl" />

      </div>

      <div>

        <p className="text-gray-500">
          Room Type
        </p>

        <h3 className="font-bold text-lg">
          {hostel.roomType}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="bg-blue-100 p-4 rounded-full">

        <FaBuilding className="text-blue-600 text-2xl" />

      </div>

      <div>

        <p className="text-gray-500">
          Total Rooms
        </p>

        <h3 className="font-bold text-lg">
          {hostel.totalRooms}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="bg-green-100 p-4 rounded-full">

        <FaDoorOpen className="text-green-600 text-2xl" />

      </div>

      <div>

        <p className="text-gray-500">
          Available Rooms
        </p>

        <h3 className="font-bold text-lg">
          {hostel.availableRooms}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="bg-purple-100 p-4 rounded-full">

        <FaCheckCircle className="text-purple-600 text-2xl" />

      </div>

      <div>

        <p className="text-gray-500">
          Occupied Rooms
        </p>

        <h3 className="font-bold text-lg">
          {hostel.occupiedRooms}
        </h3>

      </div>

    </div>

  </div>

</div>

<div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

  <h2 className="text-3xl font-bold text-gray-800 mb-8">

    Amenities

  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

    {(hostel.amenities || []).map((item) => {

      let icon;

      switch (item) {

        case "WiFi":
          icon = <FaWifi />;
          break;

        case "Parking":
          icon = <FaParking />;
          break;

        case "Water":
          icon = <FaTint />;
          break;

        case "Security":
          icon = <FaShieldAlt />;
          break;

        case "Electricity":
          icon = <FaBolt />;
          break;

        default:
          icon = "✔";
      }

      return (

        <div
          key={item}
          className="bg-green-50 hover:bg-green-100 transition rounded-2xl p-5 flex items-center gap-4"
        >

          <div className="text-2xl text-green-600">

            {icon}

          </div>

          <span className="font-semibold text-gray-700">

            {item}

          </span>

        </div>

      );

    })}

  </div>

</div>



<div className="flex items-center justify-between">

  <div className="flex items-center">

    <img
  src={
    landlord?.profileImage ||
    "https://i.pravatar.cc/100"
  }
  alt={landlord?.name || "Landlord"}
  className="w-20 h-20 rounded-full border-4 border-green-100 object-cover shadow-lg"
/>

    <div className="ml-5">

      <h3 className="flex items-center gap-2 text-xl font-bold">

  {landlord?.name}

  <FaCheckCircle
    className="text-green-600"
    title="Verified Landlord"
  />

</h3>


      <p className="text-gray-500 mt-2">
        Usually responds within a few minutes
      </p>

      <p className="text-yellow-500 mt-1">
         ⭐ HostelHub Landlord • {listingCount} Listings
      </p>


      <button
  onClick={() => hostel?.ownerId && navigate(`/landlord/${hostel.ownerId}`)}
  className="mt-4 text-green-600 font-semibold hover:underline"
>
  View All Listings →
</button>



    </div>

  </div>

</div>


<div className="flex gap-4 mt-8">
  

  {landlord?.phone ? (
  <a
    href={`tel:${landlord.phone}`}
    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
  >
    <FiPhone />
    Call
  </a>
) : (
  <button
    disabled
    className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
  >
    <FiPhone />
    No Phone
  </button>
)}



  <button
  onClick={handleWhatsApp}
  disabled={!landlord?.phone}
  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
    landlord?.phone
      ? "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`}
>
  <FiMessageCircle />
  Message
</button>

</div>




<section className="bg-white rounded-3xl shadow-lg p-8 mt-10">

  <h2 className="text-2xl font-bold mb-6">

    Write a Review

  </h2>

  {/* Rating */}

  <div className="mb-6">

    <label className="font-semibold">

      Rating

    </label>

    <select
      value={rating}
      onChange={(e) => setRating(Number(e.target.value))}
      className="w-full mt-2 border rounded-xl p-3"
    >

      <option value={5}>⭐⭐⭐⭐⭐</option>

      <option value={4}>⭐⭐⭐⭐</option>

      <option value={3}>⭐⭐⭐</option>

      <option value={2}>⭐⭐</option>

      <option value={1}>⭐</option>

    </select>

  </div>

  {/* Comment */}

  <textarea

    rows={5}

    placeholder="Share your experience..."

    value={comment}

    onChange={(e) => setComment(e.target.value)}

    className="w-full border rounded-xl p-4"

  />
<button
  onClick={handleReviewSubmit}
  disabled={submittingReview}
  className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold"
>

  {submittingReview
    ? "Submitting..."
    : "Submit Review"}

</button>
</section>


<div className="mt-10">

  <h2 className="text-2xl font-bold mb-6">

    Student Reviews

  </h2>

  {reviews.length > 0 ? (

    <div className="space-y-6">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="bg-slate-50 rounded-2xl p-6 shadow-sm"
        >

          <div className="flex items-center gap-4">

            <img
              src={
                review.studentProfile ||
                "https://i.pravatar.cc/80"
              }
              alt={review.studentName}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>

              <h3 className="font-bold">

                {review.studentName}

              </h3>

              <p className="text-yellow-500">

                {"⭐".repeat(review.rating)}

              </p>

            </div>

          </div>

          <p className="mt-4 text-gray-600">

            {review.comment}

          </p>

        </div>

      ))}

    </div>

  ) : (

    <p className="text-gray-500">

      Be the first student to review this hostel.

    </p>

  )}

</div>




<div className="bg-white rounded-3xl shadow-lg p-8 mt-12">

<h2 className="text-3xl font-bold">

Location

</h2>

<div className="flex items-center gap-2 mt-4 text-gray-600">

  <FiMapPin className="text-green-600 text-xl" />

  <span>{hostel.location}</span>

</div>

<iframe
  title="Hostel Location"
  src={`https://www.google.com/maps?q=${encodeURIComponent(
  hostel.location
)}&output=embed`}
  className="w-full h-80 rounded-2xl mt-6"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

</div>

<div className="mt-6 flex justify-end">

  <a
    href={
  hostel.googleMapsUrl
    ? hostel.googleMapsUrl
    : `https://maps.google.com/?q=${encodeURIComponent(
        hostel.location
      )}`
}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
  >
    Navigate
  </a>

</div>


<div className="mt-16">

  <h2 className="text-3xl font-bold text-gray-800 mb-8">
    Similar Hostels
  </h2>

  {similarHostels.length > 0 ? (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {similarHostels.map((item) => (

        <HostelCard
          key={item.id}
          hostel={item}
        />

      ))}

    </div>

  ) : (

    <div className="bg-white rounded-2xl p-8 text-center">

      <p className="text-gray-500">
        No similar hostels available yet.
      </p>

    </div>

  )}

</div>



</div>
  );
};

export default HostelDetails;