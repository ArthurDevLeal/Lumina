"use client";
import { Dashboard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
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

          <div className="grid grid-cols-3 gap-2">
            <Button variant={"secondary"} className="flex flex-col font-semibold">
              <div
                className={`w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center backdrop-blur-md`}
              >
                <Receipt size={20} className={"text-accent"} />
              </div>
              Send
            </Button>{" "}
            <Button variant={"secondary"} className="flex flex-col font-semibold">
              <div
                className={`w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center backdrop-blur-md`}
              >
                <BanknoteArrowUp size={20} className={"text-green-700"} />
              </div>
              Recieve
            </Button>{" "}
            <Button variant={"secondary"} className="flex flex-col font-semibold">
              <div
                className={`w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center backdrop-blur-md`}
              >
                <Target size={20} className={"text-red-700"} />
              </div>
              Set Goal
            </Button>{" "}
          </div>
        </StatCard.Root>
      </div>
    </Dashboard.Root>
  );
}
