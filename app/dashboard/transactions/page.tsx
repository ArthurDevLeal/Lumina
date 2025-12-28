"use client";

import { getIncomeTransactions } from "@/actions/income/income-transactions";
import { getOutcomeTransactions } from "@/actions/outcome/outcome-transactions";
import { Dashboard } from "@/components/dashboard";
import { Transactions } from "@/components/transactions";
import ErrorMessage from "@/components/ui/error-message";
import Loading from "@/components/ui/loading";
import { IncomeTransactionsPropsReturn } from "@/types/income/type";
import { OutcomeTransactionsPropsReturn } from "@/types/outcome/type";
import { calculateTransactions } from "@/utils/calculate-transactions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type FilterType = "all" | "income" | "outcome";

export default function TransactionsPage() {
  const [outcomesData, setOutcomesData] = useState<OutcomeTransactionsPropsReturn>();
  const [incomesData, setIncomesData] = useState<IncomeTransactionsPropsReturn>();
  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const fetchTransactions = useCallback(async () => {
    try {
      const outcomesReq = await getOutcomeTransactions();
      const incomesReq = await getIncomeTransactions();
      setOutcomesData(outcomesReq);
      setIncomesData(incomesReq);

      const allTransactions = calculateTransactions({
        incomeTransactions: incomesReq,
        outcomeTransactions: outcomesReq,
      });
      setTransactionsData(allTransactions);

      setError(null);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTx = useMemo(() => {
    if (!transactionsData) return [];

    return transactionsData.filter((tx) => {
      const txType = tx.amount > 0 ? "income" : "outcome";
      const matchesType = activeFilter === "all" || txType === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [transactionsData, activeFilter, searchQuery]);

  if (isLoading) return <Loading />;

  if (error || !outcomesData || !incomesData) {
    return <ErrorMessage isLoading={isLoading} error={error || ""} />;
  }

  return (
    <Dashboard.Root>
      <Transactions.Header />
      <div className="flex-1 flex flex-col min-h-0">
        <Transactions.Root>
          <Transactions.Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <Transactions.TableHeader />

          <Transactions.List>
            {filteredTx.length === 0 ? (
              <Transactions.Empty />
            ) : (
              filteredTx.map((tx) => (
                <Transactions.Item
                  key={tx.id}
                  id={tx.id}
                  description={tx.description}
                  type={tx.type}
                  date={tx.date}
                  amount={tx.amount}
                />
              ))
            )}
          </Transactions.List>
        </Transactions.Root>
      </div>
    </Dashboard.Root>
  );
}
