import api from "@/api/api";
import { CreateIncomeTransactionsPropsReturn } from "@/types/income/type";

interface CreateIncomeTransactionProps {
  incomeHistoryId: string;
  value?: number;
  brand?: string | null;
  name: string;
  type: string;
  category: string;
}
export async function createIncomeTransaction({
  category,
  incomeHistoryId,
  name,
  type,
  brand,
  value,
}: CreateIncomeTransactionProps): Promise<CreateIncomeTransactionsPropsReturn> {
  try {
    const res = await api.post("/income", { category, incomeHistoryId, name, type, brand, value });
    const data: CreateIncomeTransactionsPropsReturn = res.data;
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
