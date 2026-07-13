import {
  FiSearch,
  FiHeart,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import HostelCard from "../components/home/HostelCard";
import hostels from "../constants/hostels";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-3xl text-white p-8 shadow-xl">

       <h1 className="text-4xl font-bold">

         Welcome back, Moses 👋

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

                12

              </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-gray-500">

                Bookings

            </h2>

              <p className="text-4xl font-bold mt-3 text-green-600">

                  12

              </p>

        </div>

      
      <div className="bg-white rounded-3xl p-6 shadow-lg">

          <h2 className="text-gray-500">

             Messages

          </h2>

             <p className="text-4xl font-bold mt-3 text-green-600">

                 12

            </p>

      </div> 


      <div className="bg-white rounded-3xl p-6 shadow-lg">

           <h2 className="text-gray-500">

              Notifications

           </h2>

             <p className="text-4xl font-bold mt-3 text-green-600">

                 12

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

 <div className="grid md:grid-cols-2 gap-8">

    {hostels.slice(0,2).map((hostel) => (

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

    {hostels.slice(2,5).map((hostel) => (

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