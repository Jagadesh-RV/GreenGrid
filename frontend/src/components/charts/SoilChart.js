import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", moisture: 30 },
  { day: "Tue", moisture: 35 },
  { day: "Wed", moisture: 32 },
  { day: "Thu", moisture: 40 },
  { day: "Fri", moisture: 38 },
  { day: "Sat", moisture: 42 },
  { day: "Sun", moisture: 37 },
];

const SoilChart = () => {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={data}>

          {/* Grid for SaaS look */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Axis */}
          <XAxis dataKey="day" />
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Line (soil trend) */}
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SoilChart;