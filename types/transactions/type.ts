interface MonthlyTransactionData {
  date: Date;
  totalIncome: number;
  fixedIncome: number;
  variableIncome: number;
  totalOutcome: number;
  fixedOutcome: number;
  variableOutcome: number;
  balance: number;
}

interface IncomeData {
  id: string;
  incomeHistoryId: string;
  userId: string;
  createdAt: Date;
  value: number;
  brand: string | null;
  name: string;
  type: string;
  category: string;
}

interface OutcomeData {
  id: string;
  outcomeHistoryId: string;
  userId: string;
  createdAt: Date;
  value: number;
  brand: string | null;
  name: string;
  type: string;
  categoryId: string;
  category: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    name: string;
    moneySpent: number;
  };
}

interface TransactionsByMonthData extends MonthlyTransactionData {
  incomes: IncomeData[];
  outcomes: OutcomeData[];
}

export interface GetMonthlyTransactionsPropsReturn {
  message: string;
  data: MonthlyTransactionData[];
}

export interface GetTransactionsByMonthPropsReturn {
  message: string;
  data: TransactionsByMonthData;
}