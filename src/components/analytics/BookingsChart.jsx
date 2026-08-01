import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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

const BookingsChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {

      if (!auth.currentUser) return;

      const q = query(
        collection(db, "bookings"),
        where("landlordId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const monthlyBookings = new Array(12).fill(0);

      snapshot.forEach((doc) => {

        const booking = doc.data();

        if (booking.bookingDate) {

          const month =
            booking.bookingDate.toDate().getMonth();

          monthlyBookings[month]++;

        }

      });

      const chartData = months.map((month, index) => ({
        month,
        bookings: monthlyBookings[index],
      }));

      console.log(chartData);

      setData(chartData);

    };

    fetchBookings();

  }, []);

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
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default BookingsChart;