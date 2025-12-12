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
  return (
    <Dashboard.Root>
      <Dashboard.Header name="Arthur Leal" />
      <div className="flex gap-8 justify-between">
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

        <StatCard.Root className="min-w-[400px] flex flex-col gap-4" variant="light">
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
      </div>
    </Dashboard.Root>
  );
}
