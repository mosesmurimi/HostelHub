import {
  FaUniversity,
  FaArrowRight,
} from "react-icons/fa";

const universities = [
  "Kirinyaga University",
  "JKUAT",
  "Kenyatta University",
  "Embu University",
  "Chuka University",
  "Meru University",
];

const Universities = ({
  selectedUniversity,
  setSelectedUniversity,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-4xl font-bold text-gray-800">
          Browse by University
        </h2>

        <button className="text-green-600 font-semibold flex items-center gap-2 hover:underline">

          View All

          <FaArrowRight />

        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {universities.map((school) => (



          <button
  key={school}
  onClick={() =>
    setSelectedUniversity(
      selectedUniversity === school ? "" : school
    )
  }
  className={`rounded-2xl shadow-lg p-6 text-left transition duration-300
    ${
      selectedUniversity === school
        ? "bg-green-600 text-white shadow-xl"
        : "bg-white hover:shadow-xl hover:-translate-y-1"
    }`}
>



            <div className="flex items-center gap-4">

              <div className="bg-green-100 p-4 rounded-full">

                <FaUniversity className="text-green-600 text-2xl" />

              </div>

              <div>

                <h3 className="font-bold text-lg text-gray-800">

                  {school}

                </h3>
 
 <p
  className={
    selectedUniversity === school
      ? "text-green-100"
      : "text-gray-500"
  }
>
  Explore nearby hostels
</p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
};

export default Universities;