"use client";

import { getCategoryStats } from "@/actions/category/category-stats";
import { createCategory } from "@/actions/category/create-category";
import { createGoal } from "@/actions/goal/create-goal";
import { getGoalStats } from "@/actions/goal/get-goal-stats";
import { createIncomeTransaction } from "@/actions/income/create-income-transaction";
import { getIncomeHistoryStats } from "@/actions/income/get-income-history";
import { getIncomeTransactions } from "@/actions/income/income-transactions";
import { updateIncomeHistoryTotals } from "@/actions/income/update-income-history";
import { createOutcomeTransaction } from "@/actions/outcome/create-outcome";
import { getOutcomeHistoryStats } from "@/actions/outcome/get-outcome-history";
import { getOutcomeTransactions } from "@/actions/outcome/outcome-transactions";
import { updateOutcomeHistoryTotals } from "@/actions/outcome/update-outcome-history";
import { Dashboard } from "@/components/dashboard";
import { GoalFormData } from "@/components/dashboard/fast-actions/goal/goal-fast-action-button";
import { StatCard } from "@/components/ui/card";
import ErrorMessage from "@/components/ui/error-message";
import Loading from "@/components/ui/loading";
import { useUserStore } from "@/store/user-store";
import { CategoryStatsPropsReturn } from "@/types/category/type";
import { GoalStatsPropsReturn } from "@/types/goal/type";
import { IncomeHistoryPropsReturn, IncomeTransactionsPropsReturn } from "@/types/income/type";
import { OutcomeHistoryPropsReturn } from "@/types/outcome/type";

import { calculateTransactions } from "@/utils/calculate-transactions";
import { processChartData } from "@/utils/process-chart-data";
import { BanknoteArrowUp, Receipt, Target, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState<{
    incomeData: IncomeHistoryPropsReturn;
    outcomeData: OutcomeHistoryPropsReturn;
    incomeTransactions: IncomeTransactionsPropsReturn;
    outcomeTransactions: OutcomeTransactionsPropsReturn;
    categoryData: CategoryStatsPropsReturn;
    goalData: GoalStatsPropsReturn;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [balance, setBalance] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outcomeTotal, setOutcomeTotal] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { user } = useUserStore();
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [incomeData, outcomeData, incomeTransactions, outcomeTransactions, categoryData, goalData] =
        await Promise.all([
          getIncomeHistoryStats(),
          getOutcomeHistoryStats(),
          getIncomeTransactions(),
          getOutcomeTransactions(),
          getCategoryStats(),
          getGoalStats(),
        ]);

      setData({ incomeData, outcomeData, incomeTransactions, outcomeTransactions, categoryData, goalData });

      const totalIncome = incomeData?.data?.totalIncome || 0;
      const totalOutcome = outcomeData?.data?.totalOutcome || 0;

      setIncomeTotal(totalIncome);
      setOutcomeTotal(totalOutcome);
      setBalance(totalIncome - totalOutcome);

      const allTransactions = calculateTransactions({ incomeTransactions, outcomeTransactions });
      setTransactions(allTransactions);

      if (categoryData?.data) {
        const chart = processChartData({ categoryData });
        setChartData(chart);
      }

      setError(null);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleSpendMoney = async ({
    name,
    value,
    brand,
    type,
    categoryId,
  }: {
    name: string;
    value: number;
    brand?: string;
    type: string;
    categoryId: string;
  }) => {
    try {
      const OutcomeTransactionReq = await createOutcomeTransaction({
        name,
        value,
        brand,
        type,
        categoryId,
        outcomeHistoryId: data?.outcomeData.data.id as string,
      });

      const outcomeHistoryReq = await updateOutcomeHistoryTotals({
        id: data?.outcomeData.data.id as string,
      });

      const categoryData = await getCategoryStats();
      if (categoryData?.data) {
        const chart = processChartData({ categoryData });
        setChartData(chart);
      }

      const newOutcome = OutcomeTransactionReq.data;

      setTransactions((prev) => [newOutcome, ...prev]);
      setOutcomeTotal((prev) => prev + value);
      setBalance((prev) => prev - value);

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          outcomeData: outcomeHistoryReq,
          categoryData,
        };
      });

      toast.success("Expense added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating expense.");

      await fetchDashboardData();
    }
  };
  const handleCreateGoal = async ({ data }: { data: GoalFormData }) => {
    try {
      await createGoal(data);

      const goalData = await getGoalStats();

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          goalData,
        };
      });

      toast.success("Goal created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating goal.");

      await fetchDashboardData();
    }
  };

  const handleCreateCategory = async ({ name }: { name: string }) => {
    try {
      await createCategory({ name });

      const categoryData = await getCategoryStats();

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          categoryData,
        };
      });

      if (categoryData?.data) {
        const chart = processChartData({ categoryData });
        setChartData(chart);
      }

      toast.success("Category created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error creating category");
    }
  };

  const handleReceiveMoney = async ({
    name,
    value,
    brand,
    type,
    category,
  }: {
    name: string;
    value: number;
    brand?: string;
    type: string;
    category: string;
  }) => {
    try {
      const incomeTransactionReq = await createIncomeTransaction({
        category,
        incomeHistoryId: data?.incomeData.data.id as string,
        name,
        type,
        brand,
        value,
      });

      const incomeHistoryReq = await updateIncomeHistoryTotals({
        id: data?.incomeData.data.id as string,
      });

      const newIncome = incomeTransactionReq.data;

      setTransactions((prev) => [newIncome, ...prev]);
      setIncomeTotal((prev) => prev + value);
      setBalance((prev) => prev + value);

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          incomeData: incomeHistoryReq,
        };
      });

      toast.success("Income added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error adding income.");

      await fetchDashboardData();
    }
  };

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorMessage isLoading={isLoading} error={error ? error : ""} />;

  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);
  const displayLimit = 5;

  return (
    <Dashboard.Root>
      <Dashboard.Header name={user?.name as string} />
      <Dashboard.ContentRoot>
        <Dashboard.LeftContentRoot>
          <Dashboard.Card.Root>
            <StatCard.Root className="hover:-translate-y-1">
              <StatCard.Header
                icon={<Wallet size={20} className="text-primary-foreground" />}
                badge="+12.5%"
              />
              <StatCard.Content label="Total Balance" value={balance} />
            </StatCard.Root>

            <StatCard.Root variant="light" className="hover:-translate-y-1">
              <StatCard.Header
                customIconBgColor="bg-green-500/10"
                variant="light"
                icon={<TrendingUp size={20} className="text-green-700" />}
              />
              <StatCard.Content variant="light" label="Total incomes" value={incomeTotal} />
            </StatCard.Root>

            <StatCard.Root variant="light" className="hover:-translate-y-1">
              <StatCard.Header
                customIconBgColor="bg-red-500/10"
                variant="light"
                icon={<TrendingDown size={20} className="text-red-700" />}
              />
              <StatCard.Content variant="light" label="Total outcomes" value={outcomeTotal} />
            </StatCard.Root>
          </Dashboard.Card.Root>

          <StatCard.Root variant="light" className="flex flex-col gap-4">
            <Dashboard.Chart.Header />

            <div className="grid grid-cols-2 gap-8">
              <Dashboard.Chart.Root className="h-64">
                <Dashboard.Chart.Donut data={chartData} innerRadius={80} outerRadius={110} />
                <Dashboard.Chart.Label
                  value={totalSpent}
                  label="Total Spent"
                  formatter={(val) => `$${val}`}
                />
              </Dashboard.Chart.Root>

              <Dashboard.Chart.Legend.Root>
                <>
                  {chartData.slice(0, displayLimit).map((item) => (
                    <Dashboard.Chart.Legend.Item
                      key={item.name}
                      name={item.name}
                      value={item.value}
                      color={item.color}
                      total={totalSpent}
                    />
                  ))}
                  {chartData.length > displayLimit && (
                    <Dashboard.Chart.Legend.More count={chartData.length - displayLimit} />
                  )}
                </>
              </Dashboard.Chart.Legend.Root>
            </div>
          </StatCard.Root>

          <div className="flex flex-col w-full gap-4">
            <Dashboard.Goals.Header />
            <Dashboard.Goals.GoalsGrid goals={data.goalData} />
          </div>
        </Dashboard.LeftContentRoot>

        <Dashboard.RightContentRoot>
          <StatCard.Root className="flex flex-col gap-4" variant="light">
            <Dashboard.CreditCard.CardHeader />

            {/*<Dashboard.CreditCard.Root>
              <Dashboard.CreditCard.Header icon={CreditCardIcon} brand="VISA" />
              <Dashboard.CreditCard.Content>
                <Dashboard.CreditCard.Balance balance={balance} />
                <Dashboard.CreditCard.Info cardHolder="Arthur" expiryDate="12/28" />
              </Dashboard.CreditCard.Content>
            </Dashboard.CreditCard.Root> */}

            <Dashboard.FastActions.Root>
              <Dashboard.FastActions.Button
                Icon={<Receipt size={20} className="text-accent" />}
                bgColor="bg-accent/10 group-hover:bg-accent/30"
                text="Spend"
                type="outcome"
                categories={data.categoryData}
                handleClick={handleSpendMoney}
                handleCreateCategory={handleCreateCategory}
              />
              <Dashboard.FastActions.Button
                Icon={<BanknoteArrowUp size={20} className="text-green-700" />}
                bgColor="bg-green-500/10 group-hover:bg-green-500/30"
                text="Receive"
                type="income"
                handleClick={handleReceiveMoney}
              />
              <Dashboard.FastActions.Goal
                Icon={<Target size={20} className="text-destructive" />}
                bgColor="bg-destructive/20 group-hover:bg-destructive/30"
                text="Set goal"
                handleClick={handleCreateGoal}
              />
            </Dashboard.FastActions.Root>
          </StatCard.Root>

          <StatCard.Root className="flex flex-col gap-4" variant="light">
            <Dashboard.Transaction.Header />
            <div className="flex flex-col gap-4">
              {transactions.slice(0, displayLimit).map((tx) => (
                <Dashboard.Transaction.Item
                  key={tx.id}
                  id={tx.id}
                  description={tx.description}
                  date={new Date(tx.date).toISOString()}
                  amount={tx.amount}
                  type={tx.type}
                />
              ))}
              {transactions.length > displayLimit && (
                <Dashboard.Transaction.More count={transactions.length - displayLimit} />
              )}
            </div>
          </StatCard.Root>
        </Dashboard.RightContentRoot>
      </Dashboard.ContentRoot>
    </Dashboard.Root>
  );
}
