"use client";
import { getCategoryStats } from "@/actions/category/category-stats";
import { getIncomeHistoryStats } from "@/actions/income/get-income-history";
import { getOutcomeHistoryStats } from "@/actions/outcome/get-outcome-history";
import { getMonthlyTransactions } from "@/actions/transactions/get-monthly-transactions";
import { Dashboard } from "@/components/dashboard";
import { Reports } from "@/components/reports";
import ErrorMessage from "@/components/ui/error-message";
import Loading from "@/components/ui/loading";
import { CategoryStatsPropsReturn } from "@/types/category/type";
import { IncomeHistoryPropsReturn } from "@/types/income/type";
import { OutcomeHistoryPropsReturn } from "@/types/outcome/type";
import { GetMonthlyTransactionsPropsReturn } from "@/types/transactions/type";
import { processChartData } from "@/utils/process-chart-data";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [categoryData, setCategoryData] = useState<CategoryStatsPropsReturn>();
  const [chartData, setChartData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<GetMonthlyTransactionsPropsReturn>();
  const [incomeData, setIncomeData] = useState<IncomeHistoryPropsReturn>();
  const [outcomeData, setOutcomeData] = useState<OutcomeHistoryPropsReturn>();

  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalSpent, setTotalSpent] = useState(0);

  const fetchTransactionData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [categoryReq, monthlyReq, incomeReq, outcomeReq] = await Promise.all([
        getCategoryStats(),
        getMonthlyTransactions(),
        getIncomeHistoryStats(),
        getOutcomeHistoryStats(),
      ]);

      setCategoryData(categoryReq);
      setMonthlyData(monthlyReq);
      setIncomeData(incomeReq);
      setOutcomeData(outcomeReq);

      if (categoryReq?.data) {
        const chart = processChartData({ categoryData: categoryReq });
        setChartData(chart);

        const totalSpentCalc = categoryReq.data.reduce((acc, item) => acc + (item.moneySpent || 0), 0) || 0;
        setTotalSpent(totalSpentCalc);
      }

      const totalIncome = incomeReq?.data?.totalIncome || 0;
      const totalOutcome = outcomeReq?.data?.totalOutcome || 0;
      setBalance(totalIncome - totalOutcome);

      setError(null);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to load dashboard data");
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  const prepareMonthlyChartData = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    if (!monthlyData?.data) return [];

    const apiDataMap = new Map();

    monthlyData.data.forEach((item) => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${monthIndex}`;

      apiDataMap.set(key, {
        ...item,
        monthIndex,
        year,
      });
    });

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const result = [];

    for (let i = 11; i >= 0; i--) {
      let targetMonth = currentMonth - i;
      let targetYear = currentYear;

      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }

      const key = `${targetYear}-${targetMonth}`;
      const apiData = apiDataMap.get(key);

      if (apiData) {
        result.push({
          name: `${months[targetMonth]}/${targetYear.toString().slice(-2)}`,
          income: apiData.totalIncome || 0,
          expense: apiData.totalOutcome || 0,
          ...apiData,
        });
      } else {
        const date = new Date(targetYear, targetMonth, 1);

        result.push({
          name: `${months[targetMonth]}/${targetYear.toString().slice(-2)}`,
          income: 0,
          expense: 0,
          date: date.toISOString(),
          totalIncome: 0,
          fixedIncome: 0,
          variableIncome: 0,
          totalOutcome: 0,
          fixedOutcome: 0,
          variableOutcome: 0,
          balance: 0,
        });
      }
    }

    return result;
  };

  const monthlyChartData = prepareMonthlyChartData();

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage isLoading={isLoading} error={error ? error : ""} />;

  return (
    <Dashboard.Root>
      <Reports.Header />

      <Reports.Root>
        <Reports.Card
          Icon={<TrendingUp size={28} className="text-accent" />}
          amount={balance}
          bgColor="bg-accent/10"
          name="Net Worth"
        />
        <Reports.Card
          Icon={<ArrowUpRight size={28} className="text-green-700" />}
          amount={incomeData?.data?.totalIncome || 0}
          bgColor="bg-green-500/10"
          name="Avg. Income"
          perMonth={true}
        />
        <Reports.Card
          Icon={<ArrowDownRight size={28} className="text-destructive" />}
          amount={outcomeData?.data?.totalOutcome || 0}
          bgColor="bg-destructive/10"
          name="Avg. Spend"
          perMonth={true}
        />
        <Reports.Category.Root>
          <Reports.Category.Header />

          <div className="flex flex-col gap-8">
            <Dashboard.Chart.Root className="h-64">
              <Dashboard.Chart.Donut data={chartData} innerRadius={80} outerRadius={110} />
              <Dashboard.Chart.Label
                value={totalSpent}
                label="Total Spent"
                formatter={(val) => `$${val.toLocaleString()}`}
              />
            </Dashboard.Chart.Root>

            {chartData.length > 0 ? (
              <Dashboard.Chart.Legend.Root>
                {chartData.map((item) => (
                  <Dashboard.Chart.Legend.Item
                    key={item.name}
                    name={item.name}
                    value={item.value}
                    color={item.color}
                    total={totalSpent}
                  />
                ))}
              </Dashboard.Chart.Legend.Root>
            ) : (
                <div className="text-center py-4 text-gray-500">No categories with recorded expenses.</div>
            )}
          </div>
        </Reports.Category.Root>
        <Reports.Chart.Root>
          <Reports.Chart.Header />

          <div className="h-full pb-12 w-full">
            {monthlyChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" />
                <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                dy={10}
                />
                <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                content={Dashboard.Chart.CustomTooltip}
                wrapperStyle={{ zIndex: 1000 }}
                formatter={(value, name) => {
                  if (name === "income") return [`$${Number(value).toLocaleString()}`, "Income"];
                  if (name === "expense") return [`$${Number(value).toLocaleString()}`, "Expense"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Period: ${label}`}
                />

                <Bar
                dataKey="income"
                className="fill-green-700"
                radius={[8, 8, 8, 8]}
                barSize={20}
                name="Income"
                />
                <Bar dataKey="expense" fill="#1e293b" radius={[8, 8, 8, 8]} barSize={20} name="Expense" />
              </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600">No monthly data available.</p>
                <p className="text-sm text-gray-500">Add transactions to see history.</p>
              </div>
              </div>
            )}
          </div>
        </Reports.Chart.Root>
      </Reports.Root>
    </Dashboard.Root>
  );
}
