import api from "@/api/api";
import { CreateOutcomeTransactionsPropsReturn } from "@/types/outcome/type";

interface CreateOutcomeTransactionProps {
  outcomeHistoryId: string;
  value?: number;
  brand?: string | null;
  name: string;
  type: string;
  categoryId: string;
}

export async function createOutcomeTransaction({
  outcomeHistoryId,
  value,
  brand,
  name,
  type,
  categoryId,
}: CreateOutcomeTransactionProps): Promise<CreateOutcomeTransactionsPropsReturn> {
  try {
    const res = await api.post("/outcome", {
      outcomeHistoryId,
      value,
      brand,
      name,
      type,
      categoryId,
    });
    const data: CreateOutcomeTransactionsPropsReturn = res.data;
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
