"use client";
import { motion } from "framer-motion";

interface GoalCardProgressProps {
  currentValue: number;
  targetValue: number;
}

export default function GoalCardProgress({ currentValue, targetValue }: GoalCardProgressProps) {
  const percentage = Math.min(100, (currentValue / targetValue) * 100);
  const isComplete = percentage >= 100;
  const remaining = targetValue - currentValue;

  return (
    <div className="space-y-2 relative z-10">
      <div className="flex justify-between items-end mb-1">
        <span className="text-3xl font-bold text-slate-900">${currentValue.toLocaleString()}</span>
        <span
          className={`text-sm font-bold px-2 py-1 rounded-lg ${
            isComplete ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
      <p className="text-xs text-slate-400 text-right pt-1 font-medium">
        ${remaining.toLocaleString()} to go
      </p>
    </div>
  );
}