import Navbar from "../components/navigation/Navbar";
import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import HostelCard from "../components/home/HostelCard";
import hostels from "../constants/hostels";
import BottomNav from "../components/navigation/BottomNav";

const Home = () => {
  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <Hero />

      <SearchBar/>

      <div className="max-w-7xl mx-auto px-6 mt-10 mb-6 flex justify-between items-center">

  <h2 className="text-3xl font-bold text-gray-800">
    Featured Hostels
  </h2>

  <button className="text-green-600 font-semibold hover:underline">
    View All →
  </button>

</div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {hostels.map((hostel) => (
    <HostelCard
      key={hostel.id}
      hostel={hostel}
    />
  ))}

</div>

  <BottomNav/>

    </div>
  );
};

export default Home;