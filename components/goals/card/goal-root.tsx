import { ChildrenType } from "@/types/type";

interface GoalCardRootProps {
  children: ChildrenType;
  className?: string;
}

export default function GoalCardRoot({ children, className = "" }: GoalCardRootProps) {
  return (
    <div
      className={`bg-card rounded-4xl p-8 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-[100px] pointer-events-none transition-colors bg-accent " />
      {children}
    </div>
  );
}