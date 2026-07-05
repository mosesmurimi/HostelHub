import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import HostelCard from "../components/home/HostelCard";
import hostels from "../constants/hostels";
import BottomNav from "../components/navigation/BottomNav";
import CategoryFilter from "../components/home/CategoryFilter";
import PopularSection from "../components/home/PopularSection";
import LandlordBanner from "../components/home/LandlordBanner";
import Universities from "../components/home/Universities";
import Footer from "../components/home/Footer";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHostels = hostels.filter((hostel) => 
  hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  hostel.location.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <Hero />

      <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
      

      <CategoryFilter/>

      <PopularSection/>

      <div className="max-w-7xl mx-auto px-6 mt-10 mb-6 flex justify-between items-center">

  <h2 className="text-3xl font-bold text-gray-800">
    Featured Hostels
  </h2>

  <button className="text-green-600 font-semibold hover:underline">
    View All →
  </button>
  </div>

<div className="max-w-7xl mx-auto px-6 py-10">

  {filteredHostels.length > 0 ? (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {filteredHostels.map((hostel) => (
        <HostelCard
          key={hostel.id}
          hostel={hostel}
        />
      ))}

    </div>

  ) : (

    <div className="text-center py-20">

      <h2 className="text-3xl font-bold text-gray-700">

         No hostels found

      </h2>

      <p className="text-gray-500 mt-3">

        Try searching by another hostel, university or town.

      </p>

    </div>

  )}

</div>

 <LandlordBanner/>

 <Universities/>

 <Footer/>

  <BottomNav/>

    </div>
  );
};

export default Home;