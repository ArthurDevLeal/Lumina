import api from "@/api/api";
import { UpdateIncomeHistoryTotalsPropsReturn } from "@/types/income/type";

interface UpdateIncomeHistoryTotalsProps {
  id: string;
}

export async function updateIncomeHistoryTotals({
  id,
}: UpdateIncomeHistoryTotalsProps): Promise<UpdateIncomeHistoryTotalsPropsReturn> {
  try {
    const res = await api.patch("/income-history/totals", { id });
    const data: UpdateIncomeHistoryTotalsPropsReturn = res.data;
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