import { format } from "date-fns";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

interface TransactionItemProps {
  id: string;
  description: string;
  type: string;
  date: Date;
  amount: number;
}

export default function TransactionItem({ id, description, type, date, amount }: TransactionItemProps) {
  const isIncome = amount > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={id}
      className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-border/40"
    >
      <div className="col-span-6 md:col-span-5 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            isIncome
              ? "bg-green-500/10 text-green-700 group-hover:bg-green-500/20"
              : "bg-destructive/5 text-destructive group-hover:bg-destructive/20"
          }`}
        >
          <Receipt />
        </div>
        <div>
          <h4 className="font-bold text-foreground text-sm mb-0.5">{description}</h4>
          <span className="md:hidden text-xs text-muted-foreground">{format(new Date(date), "MMM d")}</span>
        </div>
      </div>

      <div className="col-span-3 hidden md:flex items-center">
        <span className="px-3 py-1 rounded-full bg-input/50 text-muted-foreground text-xs font-bold border border-border">
          {type}
        </span>
      </div>

      <div className="col-span-2 hidden md:block text-sm font-medium text-muted-foreground">
        {format(new Date(date), "MMM d, yyyy")}
      </div>

      <div className="col-span-6 md:col-span-2 text-right">
        <span className={`font-bold text-base ${isIncome ? "text-green-700" : "text-destructive"}`}>
          {isIncome ? "+" : "-"}$
          {Math.abs(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </motion.div>
  );
}
