import { ChildrenType } from "@/types/type";

interface CreditCardContentProps {
  children: ChildrenType;
}

export default function CreditCardContent({ children }: CreditCardContentProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
