import { FaBuilding, FaArrowRight } from "react-icons/fa";

const LandlordBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-3xl p-10 md:p-14 text-white shadow-xl">

        <div className="flex flex-col md:flex-row justify-between items-center gap-10">

          {/* Left */}

          <div className="max-w-2xl">

            <div className="flex items-center gap-3 mb-4">

              <FaBuilding className="text-4xl" />

              <h2 className="text-4xl font-bold">

                Own a Hostel?

              </h2>

            </div>

            <p className="text-lg text-green-100 leading-8">

              Join HostelHub and reach thousands of university students
              searching for accommodation every semester.

            </p>

            <div className="mt-8 space-y-3">

              <p>Advertise your hostel</p>

              <p>Receive booking requests</p>

              <p>Manage tenants with ease</p>

              <p> Grow your business</p>

            </div>

          </div>

          {/* Right */}

          <div>

            <button className="bg-white text-green-700 font-bold px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all duration-300">

              Become a Partner

              <FaArrowRight />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default LandlordBanner;