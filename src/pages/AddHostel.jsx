import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

const AddHostel = () => {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("Kirinyaga University");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    security: false,
    water: false,
    electricity: false,
  });

  const [loading, setLoading] = useState(false);

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;

    setAmenities((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     console.log("PUBLISH BUTTON CLICKED");


    if (!auth.currentUser) {
       console.log("NO USER LOGGED IN");
      alert("You must be logged in to publish a hostel.");
      return;
    }

    console.log("CURRENT USER:", auth.currentUser.uid);

    if (!name || !location || !price || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "hostels"), {
        name,
        university,
        location,
        price: Number(price),
        description,

        amenities: Object.keys(amenities).filter(
  (amenity) => amenities[amenity]
),

        ownerId: auth.currentUser.uid,

        availableRooms: 0,
        totalRooms: 0,

        createdAt: serverTimestamp(),
      });

      alert("Hostel published successfully! 🎉");

      // Clear form
      setName("");
      setUniversity("Kirinyaga University");
      setLocation("");
      setPrice("");
      setDescription("");

      setAmenities({
        wifi: false,
        parking: false,
        security: false,
        water: false,
        electricity: false,
      });

    } catch (error) {
      console.error("Error publishing hostel:", error);

      alert(
        "Failed to publish hostel. Please check your connection and try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            ➕ Add New Hostel
          </h1>

          <p className="mt-4 text-green-100 text-lg">
            Publish your hostel and start receiving bookings.
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
                placeholder="Campus View Hostel"
                className="w-full mt-3 border rounded-xl p-4 outline-none focus:border-green-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            {/* University */}

            <div>

              <label className="font-semibold">
                University
              </label>

              <select
                className="w-full mt-3 border rounded-xl p-4"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >

                <option>Kirinyaga University</option>
                <option>Embu University</option>
                <option>Karatina University</option>
                <option>Chuka University</option>

              </select>

            </div>

            {/* Location */}

            <div>

              <label className="font-semibold">
                Location
              </label>

              <input
                type="text"
                placeholder="Kutus Town"
                className="w-full mt-3 border rounded-xl p-4"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

            </div>

            {/* Price */}

            <div>

              <label className="font-semibold">
                Monthly Price
              </label>

              <input
                type="number"
                placeholder="6500"
                className="w-full mt-3 border rounded-xl p-4"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>

            {/* Description */}

            <div>

              <label className="font-semibold">
                Description
              </label>

              <textarea
                rows="6"
                placeholder="Describe your hostel..."
                className="w-full mt-3 border rounded-xl p-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>

            {/* Amenities */}

            <div>

              <label className="font-semibold block mb-4">
                Amenities
              </label>

              <div className="grid md:grid-cols-3 gap-4">

                <label>
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={amenities.wifi}
                    onChange={handleAmenityChange}
                  />
                  <span className="ml-2">WiFi</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="parking"
                    checked={amenities.parking}
                    onChange={handleAmenityChange}
                  />
                  <span className="ml-2">Parking</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="security"
                    checked={amenities.security}
                    onChange={handleAmenityChange}
                  />
                  <span className="ml-2">Security</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="water"
                    checked={amenities.water}
                    onChange={handleAmenityChange}
                  />
                  <span className="ml-2">Water</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="electricity"
                    checked={amenities.electricity}
                    onChange={handleAmenityChange}
                  />
                  <span className="ml-2">Electricity</span>
                </label>

              </div>

            </div>

            {/* Images - Coming Soon */}

            <div>

              <label className="font-semibold">
                Hostel Images
              </label>

              <div className="mt-4 border-2 border-dashed rounded-2xl p-10 text-center">

                <FaUpload className="mx-auto text-5xl text-green-600" />

                <p className="mt-4 text-gray-500">
                  Image upload will be connected to Firebase Storage next.
                </p>

              </div>

            </div>

            {/* Google Maps - Coming Soon */}

            <div>

              <label className="font-semibold">
                Google Maps Location
              </label>

              <div className="bg-gray-200 rounded-2xl h-72 mt-4 flex items-center justify-center">

                <p className="text-gray-500">
                  Google Maps Integration Coming Soon
                </p>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-5 rounded-2xl text-xl font-bold transition"
            >

              {loading
                ? "Publishing..."
                : "Publish Hostel"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddHostel;