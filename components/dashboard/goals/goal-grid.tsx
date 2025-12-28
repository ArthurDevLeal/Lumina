import { GoalStatsPropsReturn } from "@/types/goal/type";
import { useRouter } from "next/navigation";
import AddGoalCard from "./add-goal-card";
import GoalCard from "./goal-card";

interface GoalsGridProps {
  goals: GoalStatsPropsReturn;
}

const colorClasses = [
  "text-blue-500",
  "text-purple-500",
  "text-orange-500",
  "text-green-500",
  "text-pink-500",
  "text-cyan-500",
];

export default function GoalsGrid({ goals }: GoalsGridProps) {
  const router = useRouter();
  const handleCreateClick = () => {
    router.push("/dashboard/goals");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {goals.data &&
        goals.data.map((goal, index) => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            currentAmount={goal.currentValue}
            targetAmount={goal.targetValue}
            colorClass={colorClasses[index % colorClasses.length]}
          />
        ))}
      <AddGoalCard onClick={handleCreateClick} />
    </div>
  );
}
