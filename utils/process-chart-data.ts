import { CategoryStatsPropsReturn } from "@/types/category/type";

export const processChartData = ({ categoryData }: { categoryData: CategoryStatsPropsReturn }) => {
  const colors = ["#8b5cf6", "#f59e0b", "#6366f1", "#10b981", "#3b82f6", "#f43f5e"];
  const chartData = categoryData.data.map((category: any, index: number) => ({
    value: category.calculatedSpent,
    color: colors[index % colors.length],
    name: category.name,
  }));
  return chartData;
};
