import api from "@/api/api";
import { DeleteOutcomePropsReturn } from "@/types/outcome/type";
interface DeleteOutcomeProps {
  id: string;
}

export async function deleteOutcome({
  id,
}: DeleteOutcomeProps): Promise<DeleteOutcomePropsReturn> {
  try {
    const res = await api.delete("/outcome", { data: { id } });
    const data: DeleteOutcomePropsReturn = res.data;
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