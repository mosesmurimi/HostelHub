import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../../firebase/firebase";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RevenueChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchRevenue = async () => {

      if (!auth.currentUser) return;

      try {

        const q = query(
          collection(db, "bookings"),
          where("landlordId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const monthlyRevenue = new Array(12).fill(0);

        snapshot.forEach((doc) => {

          const booking = doc.data();

          if (
            booking.status === "Confirmed" &&
            booking.bookingDate
          ) {

            const month =
              booking.bookingDate.toDate().getMonth();

            monthlyRevenue[month] += Number(
              booking.price || 0
            );

          }

        });

        const chartData = months.map((month, index) => ({
          month,
          revenue: monthlyRevenue[index],
        }));

        console.log("Revenue Chart:", chartData);

        setData(chartData);

      } catch (error) {

        console.error(error);

      }

    };

    fetchRevenue();

  }, []);

  return (

    <div className="w-full h-80">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `KSh ${Number(value).toLocaleString()}`
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RevenueChart;