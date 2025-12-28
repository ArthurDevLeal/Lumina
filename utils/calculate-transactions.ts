import { IncomeTransactionsPropsReturn } from "@/types/income/type";

export const calculateTransactions = ({
  incomeTransactions,
  outcomeTransactions,
}: {
  incomeTransactions: IncomeTransactionsPropsReturn;
  outcomeTransactions: OutcomeTransactionsPropsReturn;
}) => {
  const incomes =
    incomeTransactions?.data?.map((tx: any) => ({
      id: tx.id,
      description: tx.name,
      date: tx.createdAt,
      amount: tx.value,
      type: tx.type,
      brand: tx.brand,
      category: tx.category,
    })) || [];

  const outcomes =
    outcomeTransactions?.data?.map((tx: any) => ({
      id: tx.id,
      description: tx.name,
      date: tx.createdAt,
      amount: -tx.value,
      type: tx.type,
      brand: tx.brand,
      categoryId: tx.categoryId,
    })) || [];

  const allTransactions = [...incomes, ...outcomes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allTransactions;
};
