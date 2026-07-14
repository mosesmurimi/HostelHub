import {
  FaHome,
  FaMale,
  FaFemale,
  FaCrown,
  FaMoneyBillWave,
} from "react-icons/fa";

const categories = [
  { icon: <FaHome />, name: "All" },
  { icon: <FaMale />, name: "Boys" },
  { icon: <FaFemale />, name: "Girls" },
  { icon: <FaCrown />, name: "Premium" },
  { icon: <FaMoneyBillWave />, name: "Affordable" },
];

const CategoryFilter = () => {
  return (
    <section className="px-6 mt-8">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">

        {categories.map((category) => (
          <button
            key={category.name}
            className="flex items-center gap-2 whitespace-nowrap bg-white px-5 py-3 rounded-full shadow hover:bg-green-600 hover:text-white transition"
          >
            {category.icon}
            {category.name}
          </button>
        ))}

      </div>

    </section>
  );
};

export default CategoryFilter;