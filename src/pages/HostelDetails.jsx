import HostelCard from "../components/home/HostelCard";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import hostels from "../constants/hostels";
import {
  FaWifi,
  FaParking,
  FaShieldAlt,
  FaBolt,
  FaTint,
} from "react-icons/fa";

const HostelDetails = () => {
    const { id } = useParams();
    const hostel = hostels.find(
    (item) => item.id === Number(id)
);
const [selectedImage, setSelectedImage] = useState(
  hostel.images[0]
);
  return (
    <div className="max-w-5xl mx-auto p-8">

  <div className="relative">

  <img
  src={selectedImage}
  alt={hostel.name}
  className="w-full h-96 object-cover rounded-3xl transition-all duration-300"
/>
<div className="grid grid-cols-4 gap-4 mt-5">

  {hostel.images.map((image) => (

    <img
      key={image}
      src={image}
      alt="Hostel"
      onClick={() => setSelectedImage(image)}
      className={`h-28 w-full object-cover rounded-xl cursor-pointer transition border-4

      ${
        selectedImage === image

          ? "border-green-600"

          : "border-transparent hover:border-green-300"

      }`}
    />

  ))}

</div>

  <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>

  <div className="absolute bottom-8 left-8 text-white">

    <h1 className="text-5xl font-bold">
      {hostel.name}
    </h1>

    <p className="text-xl mt-2">
      {hostel.location}
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

        KSh {hostel.price.toLocaleString()}

      </h2>

      <p className="text-gray-500">

        per month

      </p>

    </div>

    <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition">

      Book Viewing

    </button>

  </div>

</div>

 <div className="flex justify-end mt-6">

<button className="flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-6 py-3 rounded-xl">

<FaHeart />

Save Hostel

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

<div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

  <h2 className="text-3xl font-bold text-gray-800 mb-8">

    Amenities

  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

    {hostel.amenities.map((item) => {

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



<div className="bg-white rounded-3xl shadow-lg p-6 mt-12">

    <h2 className="text-2xl font-bold">

        Listed By

    </h2>

    <div className="flex items-center mt-5">

        <img

            src="https://i.pravatar.cc/100"

            className="w-16 h-16 rounded-full"

        />

        <div className="ml-5">

            <h3 className="font-bold text-lg">

                Moses Murimi

            </h3>

            <p className="text-gray-500">

                Hostel Manager

            </p>

        </div>

    </div>

</div>

<div className="bg-white rounded-3xl shadow-lg p-8 mt-12">

<h2 className="text-3xl font-bold mb-8">

Student Reviews

</h2>

<div className="space-y-8">

<div>

<h3 className="font-bold">

⭐⭐⭐⭐⭐ Brian Maina

</h3>

<p className="text-gray-600 mt-2">

Excellent security, clean rooms and very fast WiFi.

</p>

</div>

<div>

<h3 className="font-bold">

⭐⭐⭐⭐⭐ Mercy Wanjiku

</h3>

<p className="text-gray-600 mt-2">

Walking distance to Kirinyaga University.

</p>

</div>

<div>

<h3 className="font-bold">

⭐⭐⭐⭐☆ David Mwangi

</h3>

<p className="text-gray-600 mt-2">

Caretaker is very helpful and water is always available.

</p>

</div>

</div>

</div>



<div className="bg-white rounded-3xl shadow-lg p-8 mt-12">

<h2 className="text-3xl font-bold">

Location

</h2>

<p className="text-gray-600 mt-4">

📍 {hostel.location}

</p>

<div className="bg-gray-200 rounded-2xl h-72 mt-6 flex items-center justify-center">

<p className="text-gray-500">

Google Maps Coming Soon

</p>

</div>

</div>



<h2 className="text-3xl font-bold mt-16 mb-8">

Similar Hostels

</h2>

<div className="grid md:grid-cols-3 gap-8">

{hostels

.filter(item => item.id !== hostel.id)

.slice(0,3)

.map(item=>(

<HostelCard

key={item.id}

hostel={item}

/>

))}

</div>


</div>
  );
};

export default HostelDetails;