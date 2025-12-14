import api from "@/api/api";
import { DeleteCategoryPropsReturn } from "@/types/category/type";

interface DeleteCategoryProps {
  id: string;
}

export async function deleteCategory({
  id,
}: DeleteCategoryProps): Promise<DeleteCategoryPropsReturn> {
  try {
    const res = await api.delete("/category", { data: { id } });
    const data: DeleteCategoryPropsReturn = res.data;
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