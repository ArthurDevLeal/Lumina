interface CounterProps {
  counterList: Array<number>;
  step: number;
}
export default function Counter({ counterList, step }: CounterProps) {
  return (
    <div className="absolute top-10 flex items-center gap-2">
      {counterList.map((i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ease-out ${
            i === step ? "bg-foreground w-8" : "bg-border w-2"
          }`}
        />
      ))}
    </div>
  );
}
