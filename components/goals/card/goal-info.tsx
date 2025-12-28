interface GoalCardInfoProps {
  name: string;
  targetValue: number;
}

export default function GoalCardInfo({ name, targetValue }: GoalCardInfoProps) {
  return (
    <div className="mb-6 relative z-10">
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-slate-400 font-medium text-sm">Target:</span>
        <span className="text-slate-600 font-bold">${targetValue.toLocaleString()}</span>
      </div>
    </div>
  );
}