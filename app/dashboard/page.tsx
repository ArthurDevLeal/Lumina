"use client";

import { getCategoryStats } from "@/actions/category/category-stats";
import { getIncomeHistoryStats } from "@/actions/income/get-income-history";
import { getIncomeTransactions } from "@/actions/income/income-transactions";
import { getOutcomeHistoryStats } from "@/actions/outcome/get-outcome-history";
import { getOutcomeTransactions } from "@/actions/outcome/outcome-transactions";
import { Dashboard } from "@/components/dashboard";
import { StatCard } from "@/components/ui/card";
import { CategoryStatsPropsReturn } from "@/types/category/type";
import { IncomeHistoryPropsReturn, IncomeTransactionsPropsReturn } from "@/types/income/type";
import { OutcomeHistoryPropsReturn } from "@/types/outcome/type";

import { calculateTransactions } from "@/utils/calculate-transactions";
import { processChartData } from "@/utils/process-chart-data";
import {
  BanknoteArrowUp,
  CreditCardIcon,
  Receipt,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState<{
    incomeData: IncomeHistoryPropsReturn;
    outcomeData: OutcomeHistoryPropsReturn;
    incomeTransactions: IncomeTransactionsPropsReturn;
    outcomeTransactions: OutcomeTransactionsPropsReturn;
    categoryData: CategoryStatsPropsReturn;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [balance, setBalance] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outcomeTotal, setOutcomeTotal] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [incomeData, outcomeData, incomeTransactions, outcomeTransactions, categoryData] =
          await Promise.all([
            getIncomeHistoryStats(),
            getOutcomeHistoryStats(),
            getIncomeTransactions(),
            getOutcomeTransactions(),
            getCategoryStats(),
          ]);

        setData({ incomeData, outcomeData, incomeTransactions, outcomeTransactions, categoryData });

        const totalIncome = incomeData?.data?.totalIncome;
        const totalOutcome = outcomeData?.data?.totalOutcome;

        setIncomeTotal(totalIncome);
        setOutcomeTotal(totalOutcome);
        setBalance(totalIncome - totalOutcome);

        const allTransactions = calculateTransactions({ incomeTransactions, outcomeTransactions });
        setTransactions(allTransactions);

        if (categoryData?.data) {
          const chart = processChartData({ categoryData });
          setChartData(chart);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddTransaction = useCallback(async (newTransaction: any) => {
    try {
      // Atualiza localmente primeiro (optimistic update)
      setTransactions((prev) => [newTransaction, ...prev]);

      // Atualiza totais
      if (newTransaction.type === "income") {
        setIncomeTotal((prev) => prev + newTransaction.amount);
        setBalance((prev) => prev + newTransaction.amount);
      } else {
        setOutcomeTotal((prev) => prev + Math.abs(newTransaction.amount));
        setBalance((prev) => prev - Math.abs(newTransaction.amount));
      }

      // Chama API para persistir
      const response = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      toast.success("Transaction added successfully!");
    } catch (error) {
      await Promise.all([getIncomeTransactions(), getOutcomeTransactions()]);
      toast.error("Failed to add transaction");
    }
  }, []);

  const handleUpdateChart = useCallback(async () => {
    try {
      const categoryData = await getCategoryStats();

      if (categoryData?.data) {
        const chart = processChartData({ categoryData });
        setChartData(chart);
      }
    } catch (error) {
      toast.error("Failed to update chart");
    }
  }, []);

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      try {
        const transaction = transactions.find((tx) => tx.id === id);
        if (!transaction) return;

        // Optimistic update
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));

        if (transaction.type === "income") {
          setIncomeTotal((prev) => prev - transaction.amount);
          setBalance((prev) => prev - transaction.amount);
        } else {
          setOutcomeTotal((prev) => prev - Math.abs(transaction.amount));
          setBalance((prev) => prev + Math.abs(transaction.amount));
        }

        const response = await fetch(`/api/transactions/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");

        toast.success("Transaction deleted!");
      } catch (error) {
        // Refetch em caso de erro
        await Promise.all([getIncomeTransactions(), getOutcomeTransactions()]);

        toast.error("Failed to delete transaction");
      }
    },
    [transactions]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive font-bold mb-2">Error loading dashboard</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);
  const displayLimit = 5;

  return (
    <Dashboard.Root>
      <Dashboard.Header name="Arthur Leal" />
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
        </Dashboard.LeftContentRoot>

        <Dashboard.RightContentRoot>
          <StatCard.Root className="flex flex-col gap-4" variant="light">
            <Dashboard.CreditCard.CardHeader />

            <Dashboard.CreditCard.Root>
              <Dashboard.CreditCard.Header icon={CreditCardIcon} brand="VISA" />
              <Dashboard.CreditCard.Content>
                <Dashboard.CreditCard.Balance balance={balance} />
                <Dashboard.CreditCard.Info cardHolder="Arthur" expiryDate="12/28" />
              </Dashboard.CreditCard.Content>
            </Dashboard.CreditCard.Root>

            <Dashboard.FastActions.Root>
              <Dashboard.FastActions.Button
                Icon={<Receipt size={20} className="text-accent" />}
                bgColor="bg-accent/10 group-hover:bg-accent/30"
                iconColor="text-accent"
                text="Send"
                handleClick={() => {
                  handleAddTransaction({
                    id: Date.now().toString(),
                    description: "New Expense",
                    date: new Date(),
                    amount: -50,
                    type: "expense",
                  });
                }}
              />
              <Dashboard.FastActions.Button
                Icon={<BanknoteArrowUp size={20} className="text-green-700" />}
                bgColor="bg-green-500/10 group-hover:bg-green-500/30"
                iconColor="text-green-700"
                text="Receive"
                handleClick={() => {
                  handleAddTransaction({
                    id: Date.now().toString(),
                    description: "New Income",
                    date: new Date(),
                    amount: 100,
                    type: "income",
                  });
                }}
              />
              <Dashboard.FastActions.Button
                Icon={<Target size={20} className="text-destructive" />}
                bgColor="bg-destructive/20 group-hover:bg-destructive/30"
                iconColor="text-destructive"
                text="Set goal"
                handleClick={() => console.log("Set goal")}
              />
            </Dashboard.FastActions.Root>
          </StatCard.Root>

          <StatCard.Root className="flex flex-col gap-4" variant="light">
            <Dashboard.Transaction.Header />
            <div className="flex flex-col gap-4">
              {transactions.map((tx) => (
                <Dashboard.Transaction.Item
                  key={tx.id}
                  id={tx.id}
                  description={tx.description}
                  date={tx.date}
                  amount={tx.amount}
                  type={tx.type}
                  onClick={() => handleDeleteTransaction(tx.id)}
                />
              ))}
            </div>
          </StatCard.Root>
        </Dashboard.RightContentRoot>
      </Dashboard.ContentRoot>
    </Dashboard.Root>
  );
}
