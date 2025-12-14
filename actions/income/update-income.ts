import api from "@/api/api";
import { UpdateIncomePropsReturn } from "@/types/income/type";

interface UpdateIncomeProps {
  id: string;
  data: {
    value?: number;
    brand?: string | null;
    name?: string;
    type?: string;
    category?: string;
  };
}

export async function updateIncome({
  id,
  data,
}: UpdateIncomeProps): Promise<UpdateIncomePropsReturn> {
  try {
    const res = await api.put("/income", { id, data });
    const responseData: UpdateIncomePropsReturn = res.data;
    if (!responseData.data || !responseData.data.id) {
      throw new Error("Invalid response from server");
    }
    return responseData;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}