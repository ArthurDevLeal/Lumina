"use client"
import api from "@/api/api";
import { GetIncomeByIdPropsReturn } from "@/types/income/type";

export async function getIncomeById(id: string): Promise<GetIncomeByIdPropsReturn> {
  try {
    const res = await api.get(`/income/${id}`);
    const data: GetIncomeByIdPropsReturn = res.data;
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