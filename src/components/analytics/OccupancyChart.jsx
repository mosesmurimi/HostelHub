import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    hostel: "Campus View",
    occupancy: 95,
  },
  {
    hostel: "Green Court",
    occupancy: 90,
  },
  {
    hostel: "Victory",
    occupancy: 82,
  },
  {
    hostel: "Sunrise",
    occupancy: 78,
  },
];

const OccupancyChart = () => {
  return (
    <div className="h-80">

      <ResponsiveContainer>

        <BarChart
          layout="vertical"
          data={data}
        >

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis type="number"/>

          <YAxis
            dataKey="hostel"
            type="category"
          />

          <Tooltip/>

          <Bar
            dataKey="occupancy"
            fill="#16a34a"
            radius={[0,8,8,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default OccupancyChart;