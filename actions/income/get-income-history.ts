"use client"

import api from "@/api/api";
import { IncomeHistoryPropsReturn } from "@/types/income/type";
export async function getIncomeHistoryStats(): Promise<IncomeHistoryPropsReturn> {
  try {
    const res = await api.get("/income-history");
    const data: IncomeHistoryPropsReturn = res.data;
    if (!data.data || !data.data.id) {
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