import api from "@/api/api";
import { CreateCategoryPropsReturn } from "@/types/category/type";

interface CreateCategoryProps {
  name: string;
  moneySpent?: number;
}

export async function createCategory({
  name,
  moneySpent,
}: CreateCategoryProps): Promise<CreateCategoryPropsReturn> {
  try {
    const res = await api.post("/category", { name, moneySpent });
    const data: CreateCategoryPropsReturn = res.data;
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