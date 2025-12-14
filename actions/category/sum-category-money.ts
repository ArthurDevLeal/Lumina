import api from "@/api/api";
import { SumCategoryMoneySpentPropsReturn } from "@/types/category/type";

interface SumCategoryMoneySpentProps {
  id: string;
}

export async function sumCategoryMoneySpent({
  id,
}: SumCategoryMoneySpentProps): Promise<SumCategoryMoneySpentPropsReturn> {
  try {
    const res = await api.post("/category/sum", { id });
    const data: SumCategoryMoneySpentPropsReturn = res.data;
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