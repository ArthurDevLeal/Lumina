import { Search } from "lucide-react";

export default function TransactionsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-4">
        <Search size={24} className="opacity-50" />
      </div>
      <p className="font-medium">No transactions found.</p>
    </div>
  );
}
