"use client"

import api from "@/api/api";
export async function getOutcomeTransactions(): Promise<OutcomeTransactionsPropsReturn> {
  try {
    const res = await api.get("/outcomes");
    const data: OutcomeTransactionsPropsReturn = res.data;
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
