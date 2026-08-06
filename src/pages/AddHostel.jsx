import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

const AddHostel = () => { 


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


  const [images, setImages] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [gender, setGender] = useState("Both");
  const [totalRooms, setTotalRooms] = useState("");
  const [availableRooms,setAvailableRooms]=useState("");
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("Kirinyaga University");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

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

      if (!roomType || !totalRooms || !availableRooms) {
  alert("Please complete the room information.");
  return;
}

if (Number(availableRooms) > Number(totalRooms)) {
  alert("Available rooms cannot exceed total rooms.");
  return;
}


      // Upload all selected images to Cloudinary
const imageUrls = await Promise.all(
  images.map((image) => uploadImageToCloudinary(image))
);

console.log("Uploaded Images:", imageUrls);



  

// Save hostel to Firestore
await addDoc(collection(db, "hostels"), {

  name,
  university,
  location,
  googleMapsUrl,
  price: Number(price),
  description,
  images: imageUrls,
  gender, 


  amenities: Object.keys(amenities).filter(
    (amenity) => amenities[amenity]
  ),

  // Cloudinary image URLs


  ownerId: auth.currentUser.uid,

  roomType,

totalRooms:Number(totalRooms),

availableRooms:Number(availableRooms),

occupiedRooms:
Number(totalRooms)-Number(availableRooms),

status:
Number(availableRooms) > 0
  ? "Available"
  : "Fully Booked",

// Analytics
views: 0,
savedCount: 0,
bookingCount: 0,

createdAt: serverTimestamp(),

});



      alert("Hostel published successfully! 🎉");

      // Clear form
      setName("");
      setUniversity("Kirinyaga University");
      setLocation("");
      setPrice("");
      setRoomType("");
      setGender("Both");
      setGoogleMapsUrl("");

      setTotalRooms("");

      setAvailableRooms("");
      setDescription("");
      setImages([]);

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


            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

  <h3 className="text-lg font-bold text-green-700">

    Hostel Location

  </h3>

  <p className="text-gray-600 mt-2">

    Help students find your hostel easily.

  </p>

  <ol className="list-decimal ml-6 mt-4 space-y-2 text-gray-700">

    <li>Open Google Maps.</li>

    <li>Search your hostel.</li>

    <li>Tap <strong>Share</strong>.</li>

    <li>Select <strong>Copy Link</strong>.</li>

    <li>Paste the link below.</li>

  </ol>

  <a
    href="https://maps.google.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
  >

     Open Google Maps

  </a>

  <input
    type="url"
    value={googleMapsUrl}
    onChange={(e) => setGoogleMapsUrl(e.target.value)}
    placeholder="Paste Google Maps link here..."
    className="w-full mt-5 border rounded-xl p-4"
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

            <div>

  <label className="font-semibold">
    Room Type
  </label>

  <select
    className="w-full mt-3 border rounded-xl p-4"
    value={roomType}
    onChange={(e) => setRoomType(e.target.value)}
  >

    <option value="">Select Room Type</option>

    <option>Single Room</option>

    <option>Bedsitter</option>

    <option>One Bedroom</option>

    <option>Two Bedroom</option>

    <option>Studio Apartment</option>

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

<div>

<label className="font-semibold">

Total Number of Rooms

</label>

<input
type="number"
placeholder="50"
className="w-full mt-3 border rounded-xl p-4"
value={totalRooms}
onChange={(e)=>setTotalRooms(e.target.value)}
/>

</div>


<div>

<label className="font-semibold">

Available Rooms

</label>

<input
type="number"
placeholder="18"
className="w-full mt-3 border rounded-xl p-4"
value={availableRooms}
onChange={(e)=>setAvailableRooms(e.target.value)}
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

            

            {/* Hostel Images */}

<div>

  <label className="font-semibold">
    Hostel Images (Maximum 5)
  </label>

  <p className="text-sm text-gray-500 mt-2">
The first image becomes the hostel cover photo.
The remaining images appear in the gallery.
</p>

  <input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }

    setImages(selectedImages);
  }}
  className="w-full mt-4 border rounded-xl p-4"
/>

  {/* Image Previews */}

  {images.length > 0 && (

<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

  {images.map((image, index) => (

    <div key={index}>

      <img
        src={URL.createObjectURL(image)}
        alt={`Preview ${index + 1}`}
        className={`rounded-xl object-cover w-full ${
          index === 0
            ? "h-44 border-4 border-green-600"
            : "h-28"
        }`}
      />

      <p className="text-center mt-2 text-sm">

        {index === 0
          ? "🏠 Cover"
          : `Gallery ${index}`}

      </p>

    </div>

  ))}

</div>

)}

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