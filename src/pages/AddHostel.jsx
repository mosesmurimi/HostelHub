import { FaUpload } from "react-icons/fa";

const AddHostel = () => {
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

          <div className="space-y-8">  

                        <div>

              <label className="font-semibold">

                Hostel Name

              </label>

              <input
                type="text"
                placeholder="Campus View Hostel"
                className="w-full mt-3 border rounded-xl p-4 outline-none focus:border-green-600"
              />

            </div>

                        <div>

              <label className="font-semibold">

                University

              </label>

              <select
                className="w-full mt-3 border rounded-xl p-4"
              >

                <option>Kirinyaga University</option>

                <option>Embu University</option>

                <option>Karatina University</option>

                <option>Chuka University</option>

              </select>

            </div>


                        <div>

              <label className="font-semibold">

                Location

              </label>

              <input
                type="text"
                placeholder="Kutus Town"
                className="w-full mt-3 border rounded-xl p-4"
              />

            </div>

                        <div>

              <label className="font-semibold">

                Monthly Price

              </label>

              <input
                type="number"
                placeholder="6500"
                className="w-full mt-3 border rounded-xl p-4"
              />

            </div>


                        <div>

              <label className="font-semibold">

                Description

              </label>

              <textarea
                rows="6"
                placeholder="Describe your hostel..."
                className="w-full mt-3 border rounded-xl p-4"
              />

            </div>

                        <div>

              <label className="font-semibold block mb-4">

                Amenities

              </label>

              <div className="grid md:grid-cols-3 gap-4">

                <label>
                  <input type="checkbox" />
                  <span className="ml-2">WiFi</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span className="ml-2">Parking</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span className="ml-2">Security</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span className="ml-2">Water</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span className="ml-2">Electricity</span>
                </label>

              </div>

            </div>

                        <div>

              <label className="font-semibold">

                Hostel Images

              </label>

              <div className="mt-4 border-2 border-dashed rounded-2xl p-10 text-center hover:border-green-600 transition">

                <FaUpload className="mx-auto text-5xl text-green-600" />

                <p className="mt-4 text-gray-500">

                  Click to upload hostel images

                </p>

              </div>

            </div>

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


                        <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-xl font-bold transition"
            >

              Publish Hostel

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddHostel;