import hostels from "../constants/hostels";
import HostelCard from "../components/home/HostelCard";

const SavedHostels = () => {
  
  const savedHostels = hostels.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            ❤️ Saved Hostels
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Your favourite hostels in one place.
          </p>

        </div>

      </div>

      {/* Saved Hostels */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {savedHostels.map((hostel) => (
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

export default SavedHostels;