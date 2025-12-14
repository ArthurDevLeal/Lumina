import api from "@/api/api";
import { UpdateCategoryPropsReturn } from "@/types/category/type";

interface UpdateCategoryProps {
  id: string;
  data: {
    name?: string;
    moneySpent?: number;
  };
}

export async function updateCategory({
  id,
  data,
}: UpdateCategoryProps): Promise<UpdateCategoryPropsReturn> {
  try {
    const res = await api.put("/category", { id, data });
    const responseData: UpdateCategoryPropsReturn = res.data;
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