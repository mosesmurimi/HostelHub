import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../../firebase/firebase";

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#9333ea",
  "#ef4444",
  "#14b8a6",
];

const RevenuePieChart = () => {

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

        const revenueMap = {};

        snapshot.forEach((doc) => {

          const booking = doc.data();

          if (booking.status === "Confirmed") {

            if (!revenueMap[booking.hostelName]) {

              revenueMap[booking.hostelName] = 0;

            }

            revenueMap[booking.hostelName] += Number(booking.price);

          }

        });

        const chartData = Object.keys(revenueMap).map((hostel) => ({

          name: hostel,

          value: revenueMap[hostel],

        }));

        console.log("Revenue Pie:", chartData);

        setData(chartData);

      } catch (error) {

        console.error(error);

      }

    };

    fetchRevenue();

  }, []);

  return (

    <div className="h-80">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip
            formatter={(value) =>
              `KSh ${Number(value).toLocaleString()}`
            }
          />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RevenuePieChart;