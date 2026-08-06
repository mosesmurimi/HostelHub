import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";


const Navbar = () => {


  const [student, setStudent] = useState(null);



  useEffect(() => {

  const fetchStudent = async () => {

    if (!auth.currentUser) return;

    const docRef = doc(db, "users", auth.currentUser.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      setStudent(docSnap.data());

    }

  };

  fetchStudent();

}, []);



  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}

        <div className="flex items-center gap-2">
          <FaHome className="text-3xl text-green-500" />

          <h1 className="text-3xl font-bold text-gray-800">
            HostelHub
          </h1>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

         
          <Link to="/profile">

  <img
    src={
      student?.profileImage ||
      "https://i.pravatar.cc/40"
    }
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover border-2 border-green-600 hover:scale-105 transition"
  />

</Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;