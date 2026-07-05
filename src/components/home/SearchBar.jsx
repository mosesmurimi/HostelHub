import { FiSearch, FiMapPin, FiSliders } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="px-6 mt-4">

      <div className="bg-white rounded-2xl shadow-lg flex items-center overflow-hidden">

        <div className="px-5 text-2xl text-gray-500">
          <FiSearch />
        </div>

        <input
  type="text"
  placeholder="Search by town, university or hostel..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="flex-1 py-5 outline-none text-lg"
/>

        <button className="px-4 text-2xl text-gray-500 hover:text-green-500">
          <FiMapPin />
        </button>

        <button className="px-5 text-2xl text-green-600 hover:scale-110 transition">
          <FiSliders />
        </button>

      </div>

    </div>
  );
};

export default SearchBar;