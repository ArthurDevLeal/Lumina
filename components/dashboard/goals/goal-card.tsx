import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  colorClass: string;
}

export default function GoalCard({
  name,
  currentAmount,
  targetAmount,
  colorClass,
}: GoalCardProps) {
  const percent = Math.min(100, (currentAmount / targetAmount) * 100);

  return (
    <div className="bg-card p-5 rounded-3xl border border-border flex items-center gap-4">
      <div className="relative w-14 h-14 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={150}
            strokeDashoffset={150 - (150 * percent) / 100}
            className={cn(
              "transition-all duration-1000 ease-out",
              colorClass
            )}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <Target size={18} />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-foreground text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          ${currentAmount} / ${targetAmount}
        </p>
      </div>
    </div>
  );
}