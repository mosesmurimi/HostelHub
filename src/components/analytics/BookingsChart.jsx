import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", bookings: 8 },
  { month: "Feb", bookings: 12 },
  { month: "Mar", bookings: 15 },
  { month: "Apr", bookings: 18 },
  { month: "May", bookings: 20 },
  { month: "Jun", bookings: 23 },
];

const BookingsChart = () => {
  return (
    <div className="h-80">

      <ResponsiveContainer>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="bookings"
            fill="#2563eb"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default BookingsChart;