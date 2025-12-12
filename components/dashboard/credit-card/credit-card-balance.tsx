interface CreditCardBalanceProps {
  balance: string | number;
  formatter?: (value: string | number) => string;
}

export default function CreditCardBalance({ balance, formatter }: CreditCardBalanceProps) {
  const formattedBalance = formatter
    ? formatter(balance)
    : typeof balance === "number"
    ? `$${balance.toLocaleString()}`
    : balance;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] text-primary-foreground/70 font-medium uppercase">Total Balance</p>
      <h3 className="text-2xl font-bold tracking-widest">{formattedBalance}</h3>
    </div>
  );
}
