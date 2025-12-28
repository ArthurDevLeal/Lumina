import { Plus } from "lucide-react";

export default function CreateGoal() {
  return (
    <button className="cursor-pointer rounded-4xl border-2 border-dashed border-border0 bg-input/30 flex flex-col items-center min-h-80 justify-center text-muted-foreground hover:border-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground/70 transition-all group">
      <div className="w-16 h-16 rounded-full bg-card shadow-sm flex items-center justify-center mb-4 transition-transform">
        <Plus size={28} />
      </div>
      <span className="font-bold text-lg">Add New Goal</span>
      <span className="text-sm font-medium opacity-60 mt-1">Start saving for something new</span>
    </button>
  );
}
