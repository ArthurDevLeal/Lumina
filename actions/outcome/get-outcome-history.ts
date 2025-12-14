"use client"

import api from "@/api/api";
import { OutcomeHistoryPropsReturn } from "@/types/outcome/type";
export async function getOutcomeHistoryStats(): Promise<OutcomeHistoryPropsReturn> {
  try {
    const res = await api.get("/outcome-history");
    const data: OutcomeHistoryPropsReturn = res.data;
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