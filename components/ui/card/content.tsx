
interface StatCardContentProps {
  label: string;
  value: string | number;
  variant?: "dark" | "light";
  formatter?: (value: string | number) => string;
}

export default function StatCardContent({ label, value, variant = "dark", formatter }: StatCardContentProps) {
  const labelColor = variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";
  const valueColor = variant === "dark" ? "text-primary-foreground" : "text-card-foreground";

  const formattedValue = formatter
    ? formatter(value)
    : typeof value === "number"
    ? `$${value.toLocaleString()}`
    : value;

  return (
    <div>
      <p className={`${labelColor} text-sm font-medium mb-1`}>{label}</p>
      <h2 className={`text-3xl font-bold tracking-tight ${valueColor}`}>{formattedValue}</h2>
    </div>
  );
}
