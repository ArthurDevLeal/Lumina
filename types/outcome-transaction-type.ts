interface OutcomeTransactionsPropsReturn {
  message: string;

  data: {
    userId: string;
    id: string;
    createdAt: Date;
    name: string;
    outcomeHistoryId: string;
    value: number;
    brand: string | null;
    type: "Fixed" | "Variable";
    categoryId: string;
  }[];
}
