import { useParams } from "react-router-dom";
import hostels from "../constants/hostels";

const HostelDetails = () => {
    const { id } = useParams();
    const hostel = hostels.find(
    (item) => item.id === Number(id)
);
  return (
    <div className="max-w-5xl mx-auto p-8">

  <img
    src={hostel.image}
    alt={hostel.name}
    className="w-full h-96 object-cover rounded-2xl"
  />

  <h1 className="text-4xl font-bold mt-6">
    {hostel.name}
  </h1>

  <p className="text-gray-500 mt-2">
    {hostel.location}
  </p>

  <p className="text-yellow-500 mt-2">
    ⭐ {hostel.rating}
  </p>

  <p className="text-3xl text-green-600 font-bold mt-4">
    KSh {hostel.price.toLocaleString()}
  </p>

  <div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800">

        About this Hostel

    </h2>

    <p className="mt-4 text-gray-600 leading-8">

        {hostel.description}

    </p>

</div>

<div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800 mb-5">

        Amenities

    </h2>

    <div className="flex flex-wrap gap-4">

        {hostel.amenities.map((item)=>(
            <span
                key={item}
                className="bg-green-100 text-green-700 px-5 py-3 rounded-full font-medium"
            >
                {item}
            </span>
        ))}

    </div>

</div>

<button
className="w-full mt-12 bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-5 rounded-2xl transition">

Book Viewing

</button>

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

</div>
  );
};

export default HostelDetails;