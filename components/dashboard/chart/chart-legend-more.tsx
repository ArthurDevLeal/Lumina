interface ChartLegendMoreProps {
  count: number;
}

export default function ChartLegendMore({ count }: ChartLegendMoreProps) {
  return (
    <div className="pt-2 text-center border-t-2 border-border">
      <p className="text-xs text-muted-foreground italic">
        and {count} more {count === 1 ? "category" : "categories"}...
      </p>
    </div>
  );
}
