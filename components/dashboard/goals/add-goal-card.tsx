import { Plus } from "lucide-react";

interface AddGoalCardProps {
  onClick: () => void;
}

export default function AddGoalCard({ onClick }: AddGoalCardProps) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-dashed border-border rounded-3xl flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 hover:bg-border transition-all font-medium text-sm h-[88px] cursor-pointer"
    >
      <Plus size={16} className="mr-2" />
      Add Goal
    </button>
  );
}