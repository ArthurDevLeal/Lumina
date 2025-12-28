import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

type FilterType = "all" | "income" | "outcome";

interface TransactionsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TransactionsFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: TransactionsFiltersProps) {
  const filters: FilterType[] = ["all", "income", "outcome"];

  return (
    <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-muted-foreground/10">
      <div className="relative w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground/70 transition-colors"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search by name, category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 bg-card"
        />
      </div>

      <div className="flex items-center gap-2 bg-card p-1.5 rounded-2xl relative">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-colors relative z-10 cursor-pointer ${
              activeFilter === filter
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-xl"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}