import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import HostelCard from "../components/home/HostelCard";

const LandlordListings = () => {

  const { ownerId } = useParams();
  const navigate = useNavigate();

  const [hostels, setHostels] = useState([]);
  const [landlord, setLandlord] = useState(null);

  

    useEffect(() => {

  const fetchListings = async () => {

    // Fetch hostels
    const hostelSnapshot = await getDocs(
      collection(db, "hostels")
    );

    const listings = hostelSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(hostel => hostel.ownerId === ownerId);

    setHostels(listings);

    // Fetch landlord
    const landlordRef = doc(db, "users", ownerId);

    const landlordSnap = await getDoc(landlordRef);

    if (landlordSnap.exists()) {

      setLandlord(landlordSnap.data());

    }

  };

  fetchListings();

}, [ownerId]);


  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">



        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-6 transition"
>
  <FaArrowLeft />
  Back to Hostel
</button>

       


       <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

  <div className="flex items-center gap-6">

    <img
      src={
        landlord?.profileImage ||
        "https://i.pravatar.cc/120"
      }
      alt={landlord?.name}
      className="w-24 h-24 rounded-full object-cover border-4 border-green-100 shadow-lg"
    />

    <div>

      <h1 className="text-4xl font-bold">

        {landlord?.name}'s Listings

      </h1>

      <p className="text-gray-500 mt-2">

        Verified HostelHub Landlord

      </p>

      <p className="text-green-600 font-semibold mt-2">

        🏠 {hostels.length} Listings

      </p>


      <p className="text-gray-500 mt-4 max-w-2xl">

Browse all accommodation listed by this landlord.

Choose the hostel that best suits your budget and location.

</p>


    </div>

  </div>

</div>




        {hostels.length > 0 ? (

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {hostels.map((hostel) => (

      <HostelCard
        key={hostel.id}
        hostel={hostel}
      />

    ))}

  </div>

) : (

  <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

    <h2 className="text-3xl font-bold text-gray-700">

      No listings yet

    </h2>

    <p className="text-gray-500 mt-3">

      This landlord hasn't published any hostels yet.

    </p>

  </div>

)}



      </div>

    </div>

  );

};

export default LandlordListings;