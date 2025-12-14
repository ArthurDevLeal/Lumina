"use client"
import api from "@/api/api";
import { CategoryStatsPropsReturn } from "@/types/category/type";
export async function getCategoryStats(): Promise<CategoryStatsPropsReturn> {
  try {
    const res = await api.get("/category/stats");
    const data: CategoryStatsPropsReturn = res.data;
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