"use client";
import { addGoalProgress } from "@/actions/goal/add-goal-progress";
import { createGoal } from "@/actions/goal/create-goal";
import { getGoalStats } from "@/actions/goal/get-goal-stats";
import { Dashboard } from "@/components/dashboard";
import { GoalFormData } from "@/components/dashboard/fast-actions/goal/goal-fast-action-button";
import { Goals } from "@/components/goals";
import ErrorMessage from "@/components/ui/error-message";
import Loading from "@/components/ui/loading";
import { GoalStatsPropsReturn } from "@/types/goal/type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function goalPage() {
  const [goalsData, setGoalsData] = useState<GoalStatsPropsReturn>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      const goalsReq = await getGoalStats();
      setGoalsData(goalsReq);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleDeposit = async ({ goalId, amount }: { goalId: string; amount: number }) => {
    try {
      const goalReq = await addGoalProgress({ amount, goalId });

      if (!goalReq.data) {
        toast.error("Error depositing");
        return;
      }

      setGoalsData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          data: prev.data.map((goal) =>
            goal.id === goalReq.data.goal.id
              ? { ...goal, currentValue: goalReq.data.goal.currentValue }
              : goal
          ),
        };
      });

      const updatedGoals = await getGoalStats();
      setGoalsData(updatedGoals);

      toast.success("Deposit added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error depositing");

      await fetchGoals();
    }
  };

  const handleCreateGoal = async ({ data }: { data: GoalFormData }) => {
    try {
      await createGoal(data);

      const goalData = await getGoalStats();

      setGoalsData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: goalData.data,
        };
      });

      toast.success("Goal created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating goal.");

      await fetchGoals();
    }
  };

  if (isLoading) return <Loading />;

  if (error || !goalsData) {
    return <ErrorMessage isLoading={isLoading} error={error ? error : ""} />;
  }
  return (
    <Dashboard.Root>
      <Goals.Header />
      <div className="grid grid-cols-3 gap-4">
        {goalsData.data.map((goal) => (
          <Goals.Card.Root key={goal.id}>
            <Goals.Card.Header onMenuClick={() => console.log("Menu clicked")} />
            <Goals.Card.Info name={goal.name} targetValue={goal.targetValue} />
            <Goals.Card.Progress currentValue={goal.currentValue} targetValue={goal.targetValue} />
            <Goals.Card.Action label="Deposit" onClick={handleDeposit} goalId={goal.id} />
          </Goals.Card.Root>
        ))}
        <Goals.CreateGoal handleClick={handleCreateGoal} />
      </div>
    </Dashboard.Root>
  );
}
