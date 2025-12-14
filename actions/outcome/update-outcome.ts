import api from "@/api/api";
import { UpdateOutcomePropsReturn } from "@/types/outcome/type";

interface UpdateOutcomeProps {
  id: string;
  data: {
    value?: number;
    brand?: string | null;
    name?: string;
    type?: string;
    categoryId?: string;
  };
}

export async function updateOutcome({
  id,
  data,
}: UpdateOutcomeProps): Promise<UpdateOutcomePropsReturn> {
  try {
    const res = await api.put("/outcome", { id, data });
    const responseData: UpdateOutcomePropsReturn = res.data;
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