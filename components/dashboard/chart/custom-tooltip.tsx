export default function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-primary text-primary-foreground p-3 rounded-xl text-xs ">
        <p className="font-bold">{payload[0].name}</p>
        <p className="font-medium text-muted-foreground">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}
