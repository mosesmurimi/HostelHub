import { FaUserEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "../services/auth";

const Profile = () => {

   const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 h-56"></div>

      <div className="max-w-4xl mx-auto px-6">

        {/* Profile Card */}

        <div className="bg-white rounded-3xl shadow-xl -mt-20 p-8">

          <div className="flex flex-col items-center">

            <img
              src="https://i.pravatar.cc/200"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg"
            />

            <h1 className="text-4xl font-bold mt-6">
              Moses Murimi
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              Kirinyaga University
            </p>

          </div>

        </div>

        {/* Information Card */}

        <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Personal Information
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">
                moseslmurimi@gmail.com
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">
                +254 716 115 353
              </h3>
            </div>

            <div>
              <p className="text-gray-500">University</p>
              <h3 className="font-semibold">
                Kirinyaga University
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Course</p>
              <h3 className="font-semibold">
                BSc Software Engineering
              </h3>
            </div>

          </div>

        </div>

        {/* Action Buttons */}

        <div className="grid md:grid-cols-3 gap-6 mt-8 mb-12">

          <button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-6 flex flex-col items-center transition">

            <FaUserEdit className="text-3xl mb-3" />

            Edit Profile

          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 flex flex-col items-center transition">

            <FaCog className="text-3xl mb-3" />

            Settings

          </button>

          <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 flex flex-col items-center transition">

            <FaSignOutAlt className="text-3xl mb-3" />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;