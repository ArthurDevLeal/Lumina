interface ChartCenterLabelProps {
  value: string | number;
  label: string;
  formatter?: (value: string | number) => string;
}

export default function ChartCenterLabel({ value, label, formatter }: ChartCenterLabelProps) {
  const formattedValue = formatter
    ? formatter(value)
    : typeof value === "number"
      ? value.toLocaleString()
      : value;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <span className="text-3xl font-bold text-foreground">{formattedValue}</span>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
