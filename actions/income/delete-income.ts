import api from "@/api/api";
import { DeleteIncomePropsReturn } from "@/types/income/type";

interface DeleteIncomeProps {
  id: string;
}

export async function deleteIncome({
  id,
}: DeleteIncomeProps): Promise<DeleteIncomePropsReturn> {
  try {
    const res = await api.delete("/income", { data: { id } });
    const data: DeleteIncomePropsReturn = res.data;
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