import hostels from "../../constants/hostels";
import PopularCard from "./PopularCard";

const PopularSection = () => {
  return (
    <section className="mt-16">

      <div className="flex justify-between items-center px-6 mb-6">

        <h2 className="text-3xl font-bold">
           Popular Near You
        </h2>

        <button className="text-green-600 font-semibold">
          View All →
        </button>

      </div>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4">

        {hostels.map((hostel) => (

          <PopularCard
            key={hostel.id}
            hostel={hostel}
          />

        ))}

      </div>

    </section>
  );
};

export default PopularSection;