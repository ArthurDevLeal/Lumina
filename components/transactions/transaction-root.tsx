import { ReactNode } from "react";

interface TransactionsRootProps {
  children: ReactNode;
}

export default function TransactionsRoot({ children }: TransactionsRootProps) {
  return (
    <div className="bg-background rounded-4xl border border-border shadow-sm flex flex-col overflow-hidden h-full">
      {children}
    </div>
  );
}
