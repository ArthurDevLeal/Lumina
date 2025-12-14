interface OutcomeData {
  id: string;
  userId: string;
  outcomeHistoryId: string;
  createdAt: Date;
  value: number;
  brand: string | null;
  name: string;
  type: string;
  categoryId: string;
}

export interface CreateOutcomeTransactionsPropsReturn {
  message: string;
  data: OutcomeData;
}

export interface OutcomeTransactionsPropsReturn {
  message: string;
  data: OutcomeData[];
}

export interface GetOutcomeByIdPropsReturn {
  message: string;
  data: OutcomeData;
}

export interface UpdateOutcomePropsReturn {
  message: string;
  data: OutcomeData;
}

export interface DeleteOutcomePropsReturn {
  message: string;
  data: OutcomeData;
}

export interface GetOutcomesByCategoryPropsReturn {
  message: string;
  data: OutcomeData[];
}

interface OutcomeHistoryData {
  id: string;
  userId: string;
  totalOutcome: number;
  fixedOutcome: number;
  variableOutcome: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OutcomeHistoryPropsReturn {
  message: string;
  data: OutcomeHistoryData;
}

export interface CreateOutcomeHistoryPropsReturn {
  message: string;
  data: OutcomeHistoryData;
}

export interface UpdateOutcomeHistoryTotalsPropsReturn {
  message: string;
  data: OutcomeHistoryData;
}