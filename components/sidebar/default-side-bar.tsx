"use client";
import { BanknoteArrowDown, CreditCard, LayoutDashboard, PieChart, Receipt, Settings, Target, Wallet } from "lucide-react";
import { Sidebar } from ".";

export default function DefaultSideBar() {
  return (
    <Sidebar.Root>
      <Sidebar.Logo />

      <Sidebar.Navigation>
        <Sidebar.Section title="Main Menu">
          <Sidebar.Item to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <Sidebar.Item to="/dashboard/transactions" icon={Receipt} label="Transactions" />
          <Sidebar.Item to="/dashboard/goals" icon={Target} label="Savings Goals" />
        </Sidebar.Section>

        <Sidebar.Section title="Analysis">
          <Sidebar.Item to="/dashboard/reports" icon={PieChart} label="Reports" />
        </Sidebar.Section>

        <Sidebar.Section title="General">
          <Sidebar.Item to="/dashboard/settings" icon={Settings} label="Settings" />
        </Sidebar.Section>
      </Sidebar.Navigation>
        <Sidebar.Profile />
    </Sidebar.Root>
  );
}
