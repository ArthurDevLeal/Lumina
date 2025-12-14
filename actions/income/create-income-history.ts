import api from "@/api/api";
import { CreateIncomeHistoryPropsReturn } from "@/types/income/type";

export async function createIncomeHistory(): Promise<CreateIncomeHistoryPropsReturn> {
  try {
    const res = await api.post("/income-history");
    const data: CreateIncomeHistoryPropsReturn = res.data;
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