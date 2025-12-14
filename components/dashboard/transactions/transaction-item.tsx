"use client";
import { format } from "date-fns";
import { Receipt } from "lucide-react";

interface TransactionItemProps {
  id: string;
  description: string;
  date: Date | string;
  amount: number;
  type: string;
  onClick?: () => void;
}

export default function TransactionItem({
  id,
  description,
  date,
  amount,
  type,
  onClick,
}: TransactionItemProps) {
  const isIncome = type === "income";
  const bgColor = isIncome
    ? "bg-green-500/10 text-green-700 group-hover:bg-green-500/30"
    : "bg-destructive/20 text-destructive group-hover:bg-destructive/30";
  const amountColor = isIncome ? "text-emerald-600" : "text-destructive";
  const formattedDate = format(new Date(date), "MMM d, h:mm a");
  const formattedAmount = `${isIncome ? "+" : "-"}$${Math.abs(amount)}`;

  return (
    <div key={id} onClick={onClick} className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${bgColor}`}
        >
          <Receipt size={20} />
        </div>
        <div>
          <h4 className="font-bold text-foreground text-sm">{description}</h4>
          <p className="text-xs text-muted-foreground font-medium">{formattedDate}</p>
        </div>
      </div>
      <span className={`font-bold text-sm ${amountColor}`}>{formattedAmount}</span>
    </div>
  );
}
