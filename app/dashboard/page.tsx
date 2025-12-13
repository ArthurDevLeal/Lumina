"use client";
import { Dashboard } from "@/components/dashboard";
import { StatCard } from "@/components/ui/card";
import {
  BanknoteArrowUp,
  CreditCardIcon,
  Receipt,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function Page() {
  const chartData = [
    { value: 1200, color: "#8b5cf6", name: "Food" },
    { value: 800, color: "#f59e0b", name: "Transport" },
    { value: 500, color: "#6366f1", name: "Entertainment" },
    { value: 300, color: "#10b981", name: "Shopping" },
    { value: 150, color: "#3b82f6", name: "Health" },
    { value: 100, color: "#f43f5e", name: "Education" },
  ];

  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);
  const displayLimit = 5;
  return (
    <Dashboard.Root>
      <Dashboard.Header name="Arthur Leal" />
      <Dashboard.ContentRoot>
        <Dashboard.LeftContentRoot>
          <Dashboard.Card.Root>
            <StatCard.Root className="hover:-translate-y-1">
              <StatCard.Header icon={Wallet} badge="+12.5%" />
              <StatCard.Content label="Total Balance" value={3500} />
            </StatCard.Root>
            <StatCard.Root variant="light" className="hover:-translate-y-1">
              <StatCard.Header
                customIconBgColor="bg-green-500/10"
                customIconColor="text-green-700"
                variant="light"
                icon={TrendingUp}
              />
              <StatCard.Content variant="light" label="Total incomes" value={3500} />
            </StatCard.Root>
            <StatCard.Root variant="light" className="hover:-translate-y-1">
              <StatCard.Header
                customIconBgColor="bg-red-500/10"
                customIconColor="text-red-700"
                variant="light"
                icon={TrendingDown}
              />
              <StatCard.Content variant="light" label="Total outcomes" value={3500} />
            </StatCard.Root>
          </Dashboard.Card.Root>

          <StatCard.Root variant="light">
            <Dashboard.Chart.Header />

            <div className="grid grid-cols-2 gap-8">
              <Dashboard.Chart.Root className="h-64">
                <Dashboard.Chart.Donut
                  data={chartData}
                  innerRadius={80}
                  outerRadius={110}
                  customTooltip={Dashboard.Chart.CustomTooltip}
                />
                <Dashboard.Chart.Label value={2500} label="Total Spent" formatter={(val) => `$${val}`} />
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
                <Dashboard.CreditCard.Balance balance={23503} />
                <Dashboard.CreditCard.Info cardHolder="Arthur" expiryDate="12/28" />
              </Dashboard.CreditCard.Content>
            </Dashboard.CreditCard.Root>

            <Dashboard.FastActions.Root>
              <Dashboard.FastActions.Button
                Icon={Receipt}
                bgColor="bg-accent/10"
                iconColor="text-accent"
                text="Send"
              />
              <Dashboard.FastActions.Button
                Icon={BanknoteArrowUp}
                bgColor="bg-green-500/10"
                iconColor="text-green-700"
                text="Recieve"
              />
              <Dashboard.FastActions.Button
                Icon={Target}
                bgColor="bg-red-500/10"
                iconColor="text-red-700"
                text="Set goal"
              />
            </Dashboard.FastActions.Root>
          </StatCard.Root>
        </Dashboard.RightContentRoot>
      </Dashboard.ContentRoot>
    </Dashboard.Root>
  );
}
