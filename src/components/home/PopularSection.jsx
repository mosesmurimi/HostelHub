import HostelCard from "./HostelCard";

const PopularSection = ({ hostels }) => {
  return (
    <section className="mt-16">

      <div className="flex justify-between items-center px-6 mb-6">

        <h2 className="text-3xl font-bold">
           Trending Hostels
        </h2>

        <button className="text-green-600 font-semibold">
          View All →
        </button>

      </div>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4">

        {hostels.map((hostel) => (

  <div
    key={hostel.id}
    className="min-w-85 max-w-85 shrink-0"
  >
    <HostelCard hostel={hostel} />
  </div>

))}

      </div>

    </section>
  );
};

export default PopularSection;