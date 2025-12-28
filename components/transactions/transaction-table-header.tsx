export default function TransactionsTableHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-muted-foreground/10 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
      <div className="col-span-6 md:col-span-5">Transaction</div>
      <div className="col-span-3 md:col-span-3 hidden md:block">Category</div>
      <div className="col-span-3 md:col-span-2 hidden md:block">Date</div>
      <div className="col-span-6 md:col-span-2 text-right">Amount</div>
    </div>
  );
}