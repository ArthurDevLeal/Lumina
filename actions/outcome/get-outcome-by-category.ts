import api from "@/api/api";
import { GetOutcomesByCategoryPropsReturn } from "@/types/outcome/type";

interface GetOutcomesByCategoryProps {
  categoryId: string;
}

export async function getOutcomesByCategory({
  categoryId,
}: GetOutcomesByCategoryProps): Promise<GetOutcomesByCategoryPropsReturn> {
  try {
    const res = await api.get("/outcomes/category", { data: { categoryId } });
    const data: GetOutcomesByCategoryPropsReturn = res.data;
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