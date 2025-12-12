interface CreditCardInfoProps {
  cardHolder: string;
  expiryDate: string;
}

export default function CreditCardInfo({ cardHolder, expiryDate }: CreditCardInfoProps) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <p className="text-[10px] text-primary-foreground/70 uppercase tracking-wider">Card Holder</p>
        <p className="font-medium tracking-wide">{cardHolder}</p>
      </div>
      <div>
        <p className="text-[10px] text-primary-foreground/70 uppercase tracking-wider">Expires</p>
        <p className="font-medium tracking-wide">{expiryDate}</p>
      </div>
    </div>
  );
}