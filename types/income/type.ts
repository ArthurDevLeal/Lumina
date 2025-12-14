interface IncomeData {
  id: string;
  userId: string;
  incomeHistoryId: string;
  createdAt: Date;
  value: number;
  brand: string | null;
  name: string;
  type: string;
  category: string;
}

export interface CreateIncomeTransactionsPropsReturn {
  message: string;
  data: IncomeData;
}

export interface IncomeTransactionsPropsReturn {
  message: string;
  data: IncomeData[];
}

export interface GetIncomeByIdPropsReturn {
  message: string;
  data: IncomeData;
}

export interface UpdateIncomePropsReturn {
  message: string;
  data: IncomeData;
}

export interface DeleteIncomePropsReturn {
  message: string;
  data: IncomeData;
}

export interface GetIncomesByCategoryPropsReturn {
  message: string;
  data: IncomeData[];
}

export interface IncomeTransactionsPropsReturn {
  message: string;

  data: {
    userId: string;
    id: string;
    createdAt: Date;
    name: string;
    value: number;
    brand: string | null;
    type: string;
    category: string;
    incomeHistoryId: string;
  }[];
}

interface IncomeHistoryData {
  id: string;
  userId: string;
  totalIncome: number;
  fixedIncome: number;
  variableIncome: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncomeHistoryPropsReturn {
  message: string;
  data: IncomeHistoryData;
}

export interface CreateIncomeHistoryPropsReturn {
  message: string;
  data: IncomeHistoryData;
}

export interface UpdateIncomeHistoryTotalsPropsReturn {
  message: string;
  data: IncomeHistoryData;
}