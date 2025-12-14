"use client";

import api from "@/api/api";
import { IncomeTransactionsPropsReturn } from "@/types/income/type";
export async function getIncomeTransactions(): Promise<IncomeTransactionsPropsReturn> {
  try {
    const res = await api.get("/incomes");
    const data: IncomeTransactionsPropsReturn = res.data;
    if (!data.data) {
      throw new Error("Invalid response from server");
    }
    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
