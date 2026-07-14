import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Campus View",
    value: 40000,
  },
  {
    name: "Green Court",
    value: 25000,
  },
  {
    name: "Victory",
    value: 10000,
  },
  {
    name: "Sunrise",
    value: 5000,
  },
];

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#9333ea",
];

const RevenuePieChart = () => {
  return (
    <div className="h-80">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >

            {data.map((entry,index)=>(

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenuePieChart;