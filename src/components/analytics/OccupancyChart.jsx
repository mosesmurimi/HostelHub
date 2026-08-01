import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../../firebase/firebase";

const OccupancyChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchOccupancy = async () => {

      if (!auth.currentUser) return;

      try {

        const q = query(
          collection(db, "hostels"),
          where("ownerId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const chartData = snapshot.docs.map((doc) => {

          const hostel = doc.data();

          const totalRooms = Number(hostel.totalRooms || 0);

          const occupiedRooms = Number(hostel.occupiedRooms || 0);

          const occupancy =
            totalRooms > 0
              ? Math.round((occupiedRooms / totalRooms) * 100)
              : 0;

          return {

            hostel: hostel.name,

            occupancy,

          };

        });

        console.log("Occupancy Chart:", chartData);

        setData(chartData);

      } catch (error) {

        console.error(error);

      }

    };

    fetchOccupancy();

  }, []);

  return (

    <div className="h-80">

      <ResponsiveContainer>

        <BarChart
          layout="vertical"
          data={data}
        >

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis
            type="number"
            domain={[0,100]}
          />

          <YAxis
            dataKey="hostel"
            type="category"
            width={120}
          />

          <Tooltip
            formatter={(value)=>`${value}%`}
          />

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