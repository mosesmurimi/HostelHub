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

const CategoryFilter = ({ activeFilter, setActiveFilter }) => {
  return (
    <section className="px-6 mt-8">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">

        {categories.map((category) => (
          <button
  key={category.name}
  onClick={() => setActiveFilter(category.name)}
  className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-full shadow transition

    ${
      activeFilter === category.name
        ? "bg-green-600 text-white"
        : "bg-white hover:bg-green-600 hover:text-white"
    }

  `}
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