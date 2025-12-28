export default function TransactionMore({ count }: { count: number }) {
  return (
    <div className="pt-2 text-center border-t-2 border-border">
      <p className="text-xs text-muted-foreground italic">
        and {count} more {count === 1 ? "transaction" : "transactions"}...
      </p>
    </div>
  );
}
