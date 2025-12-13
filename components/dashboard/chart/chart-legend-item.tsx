interface ChartLegendItemProps {
  name: string;
  value: number;
  color: string;
  total: number;
  formatter?: (value: number) => string;
}

export default function ChartLegendItem({ name, value, color, total, formatter }: ChartLegendItemProps) {
  const formattedValue = formatter ? formatter(value) : `$${value.toLocaleString()}`;
  const percentage = ((value / total) * 100).toFixed(1);

  return (
    <div className="flex justify-between items-center cursor-default">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-lg transition-transform"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-bold text-foreground">{name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-bold text-foreground">{formattedValue}</span>
        <span className="text-[10px] text-muted-foreground font-medium">{percentage}%</span>
      </div>
    </div>
  );
}
