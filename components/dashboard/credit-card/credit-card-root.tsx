import { ChildrenType } from "@/types/type";

interface CreditCardRootProps {
  children: ChildrenType;
  className?: string;
}

export default function CreditCardRoot({ children, className = "" }: CreditCardRootProps) {
  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-br from-primary to-primary/80 p-6 text-primary-foreground relative overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer ${className}`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 -left-5 w-20 h-20 bg-accent/20 rounded-full blur-2xl"></div>
      <div className="flex flex-col justify-between h-full relative z-10 gap-4">{children}</div>
    </div>
  );
}
