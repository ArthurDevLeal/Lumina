import { ReactNode } from "react";

interface TransactionsListProps {
  children: ReactNode;
}

export default function TransactionsList({ children }: TransactionsListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="space-y-1">{children}</div>
    </div>
  );
}
