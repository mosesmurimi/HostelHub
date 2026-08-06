import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const EditHostel = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("Both");

  useEffect(() => {

    const fetchHostel = async () => {

      try {

        const hostelRef = doc(
          db,
          "hostels",
          id
        );

        const hostelSnap = await getDoc(
          hostelRef
        );

        if (!hostelSnap.exists()) {

          alert("Hostel listing not found.");

          navigate("/my-listings");

          return;
        }

        const hostelData =
          hostelSnap.data();

        setName(
          hostelData.name || ""
        );

        setUniversity(
          hostelData.university || ""
        );

        setGender(hostelData.gender || "Both");

        setLocation(
          hostelData.location || ""
        );

        setPrice(
          hostelData.price || ""
        );

        setDescription(
          hostelData.description || ""
        );

        setGender(
         hostelData.gender || "Boys"
        );

      } catch (error) {

        console.error(
          "Error loading hostel:",
          error
        );

        alert(
          "Failed to load hostel listing."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchHostel();

  }, [id, navigate]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);

    try {

      const hostelRef = doc(
        db,
        "hostels",
        id
      );

      await updateDoc(
        hostelRef,
        {
          name,
          university,
          gender,
          location,
          price: Number(price),
          description,
        }
      );

      alert(
        "Hostel updated successfully!"
      );

      navigate("/my-listings");

    } catch (error) {

      console.error(
        "Error updating hostel:",
        error
      );

      alert(
        "Failed to update hostel."
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <p className="text-xl font-semibold">
          Loading hostel...
        </p>

      </div>
    );

  }


  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            ✏️ Edit Hostel
          </h1>

          <p className="mt-4 text-green-100 text-lg">
            Update your hostel listing details.
          </p>

        </div>

      </div>


      {/* Form */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Hostel Name */}

            <div>

              <label className="font-semibold">
                Hostel Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full mt-3 border rounded-xl p-4 outline-none focus:border-green-600"
                required
              />

            </div>


            {/* University */}

            <div>

              <label className="font-semibold">
                University
              </label>

              <select
                value={university}
                onChange={(e) =>
                  setUniversity(e.target.value)
                }
                className="w-full mt-3 border rounded-xl p-4"
              >

                <option value="">
                  Select University
                </option>

                <option value="Kirinyaga University">
                  Kirinyaga University
                </option>

                <option value="Embu University">
                  Embu University
                </option>

                <option value="Karatina University">
                  Karatina University
                </option>

                <option value="Chuka University">
                  Chuka University
                </option>

              </select>

            </div>


            <div>

  <label className="font-semibold">

    Hostel Gender

  </label>

  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="w-full mt-3 border rounded-xl p-4"
  >

    <option value="Both">

      Both Boys & Girls

    </option>

    <option value="Boys">

      Boys Only

    </option>

    <option value="Girls">

      Girls Only

    </option>

  </select>

</div>



            {/* Location */}

            <div>

              <label className="font-semibold">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full mt-3 border rounded-xl p-4"
                required
              />

            </div>


            {/* Price */}

            <div>

              <label className="font-semibold">
                Monthly Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full mt-3 border rounded-xl p-4"
                required
              />

            </div>


            {/* Description */}

            <div>

              <label className="font-semibold">
                Description
              </label>

              <textarea
                rows="6"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full mt-3 border rounded-xl p-4"
              />

            </div>


            {/* Save */}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-5 rounded-2xl text-xl font-bold transition"
            >

              {saving
                ? "Saving Changes..."
                : "Save Changes"}

            </button>


          </form>

        </div>

      </div>

    </div>

  );

};

export default EditHostel;