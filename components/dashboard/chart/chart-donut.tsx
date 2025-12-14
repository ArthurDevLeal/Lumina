"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Dashboard } from "..";

interface ChartData {
  value: number;
  color: string;
  name?: string;
}

interface DonutChartProps {
  data: ChartData[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

export default function DonutChart({
  data,
  innerRadius = 80,
  outerRadius = 110,
  paddingAngle = 5,
}: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data as any}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={Dashboard.Chart.CustomTooltip} wrapperStyle={{ zIndex: 1000 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
