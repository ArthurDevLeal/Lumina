import { LucideIcon } from "lucide-react";

interface CreditCardHeaderProps {
  icon: LucideIcon;
  brand: string;
}

export default function CreditCardHeader({ icon: Icon, brand }: CreditCardHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <Icon className="text-primary-foreground/70" />
      <span className="text-lg italic font-bold text-primary-foreground/70">{brand}</span>
    </div>
  );
}
