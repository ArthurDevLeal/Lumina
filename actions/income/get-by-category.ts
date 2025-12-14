import api from "@/api/api";
import { GetIncomesByCategoryPropsReturn } from "@/types/income/type";

interface GetIncomesByCategoryProps {
  categoryName: string;
}

export async function getIncomesByCategory({
  categoryName,
}: GetIncomesByCategoryProps): Promise<GetIncomesByCategoryPropsReturn> {
  try {
    const res = await api.get("/income/category", { data: { categoryName } });
    const data: GetIncomesByCategoryPropsReturn = res.data;
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