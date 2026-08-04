import { useNavigate } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUserEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "../services/auth";

const Profile = () => {

  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  university: "",
  course: "",
});





const uploadImageToCloudinary = async (image) => {

  const formData = new FormData();

  formData.append("file", image);

  formData.append("upload_preset", "hostelhub_uploads");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/wfvj46ip/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(data.error?.message || "Upload failed");

  }

  return data.secure_url;

};




 // fetches logged in student data
  useEffect(() => {

  const fetchStudent = async () => {

    if (!auth.currentUser) return;

    try {

      const docRef = doc(db, "users", auth.currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setStudent(docSnap.data());

        setFormData({
  name: docSnap.data().name || "",
  phone: docSnap.data().phone || "",
  university: docSnap.data().university || "",
  course: docSnap.data().course || "",
});


      }

    } catch (error) {

      console.error(error);

    }

  };

  fetchStudent();

}, []);



   const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };





const handleSave = async () => {

  if (!auth.currentUser) return;

  try {

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {
      name: formData.name,
      phone: formData.phone,
      university: formData.university,
      course: formData.course,
    });

    // Update local state immediately
    setStudent({
      ...student,
      ...formData,
    });

    setEditing(false);

    alert("Profile updated successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to update profile.");

  }

};

//upload function 

const handleProfileImage = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    setUploading(true);

    const imageUrl = await uploadImageToCloudinary(file);

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {

      profileImage: imageUrl,

    });

    setStudent({

      ...student,

      profileImage: imageUrl,

    });

    setProfileImage(imageUrl);

    alert("Profile picture updated successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to upload image.");

  } finally {

    setUploading(false);

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
  src={
    profileImage ||
    student?.profileImage ||
    "https://i.pravatar.cc/200"
  }
  alt="Profile"
  className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
/>


<input
  type="file"
  accept="image/*"
  className="hidden"
  id="profileImage"
  onChange={handleProfileImage}
/>

<label
  htmlFor="profileImage"
  className="mt-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
>
  {uploading ? "Uploading..." : "Change Profile Picture"}
</label>




{editing ? (

  <input
    type="text"
    value={formData.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        name: e.target.value,
      })
    }
    className="mt-6 border-2 border-gray-300 rounded-xl px-4 py-2 text-3xl font-bold text-center w-full focus:outline-none focus:border-green-600"
  />

) : (
            <h1 className="text-4xl font-bold mt-6">
               {student?.name || "Student"}
            </h1>
)}


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
                 {student?.email || "No email"}
              </h3>
            </div>


            <div>

  <p className="text-gray-500">
    Phone
  </p>

  {editing ? (

    <input
      type="text"
      value={formData.phone}
      onChange={(e) =>
        setFormData({
          ...formData,
          phone: e.target.value,
        })
      }
      className="mt-2 border-2 border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-green-600"
    />

  ) : (

    <h3 className="font-semibold">
      {student?.phone || "No phone number"}
    </h3>

  )}

</div>





<div>

  <p className="text-gray-500">
    University
  </p>

  {editing ? (

    <input
      type="text"
      value={formData.university}
      onChange={(e) =>
        setFormData({
          ...formData,
          university: e.target.value,
        })
      }
      className="mt-2 border-2 border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-green-600"
    />

  ) : (

    <h3 className="font-semibold">
      {student?.university || "No university"}
    </h3>

  )}

</div>




            <div>

  <p className="text-gray-500">
    Course
  </p>

  {editing ? (

    <input
      type="text"
      value={formData.course}
      onChange={(e) =>
        setFormData({
          ...formData,
          course: e.target.value,
        })
      }
      className="mt-2 border-2 border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-green-600"
    />

  ) : (

    <h3 className="font-semibold">
      {student?.course || "No course"}
    </h3>

  )}

</div>




          </div>

        </div>

        {/* Action Buttons */}

        <div className="grid md:grid-cols-3 gap-6 mt-8 mb-12">

          <button
  onClick={() => {

    if (editing) {

      handleSave();

    } else {

      setEditing(true);

    }

  }}
  className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-6 flex flex-col items-center transition"
>

  <FaUserEdit className="text-3xl mb-3" />

  {editing ? "Save Changes" : "Edit Profile"}

</button>





          <button
           onClick={() => navigate("/settings")}
           className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 flex flex-col items-center transition">

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