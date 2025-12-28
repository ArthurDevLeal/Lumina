import api from "@/api/api";
import { DeleteGoalPropsReturn } from "@/types/goal/type";

interface DeleteGoalProps {
  id: string;
}

export async function deleteGoal({
  id,
}: DeleteGoalProps): Promise<DeleteGoalPropsReturn> {
  try {
    const res = await api.delete("/goal", { data: { id } });
    const data: DeleteGoalPropsReturn = res.data;
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