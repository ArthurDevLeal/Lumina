import api from "@/api/api";
import { AddGoalProgressPropsReturn } from "@/types/goal/type";

interface AddGoalProgressProps {
  goalId: string;
  amount: number;
}

export async function addGoalProgress({
  goalId,
  amount,
}: AddGoalProgressProps): Promise<AddGoalProgressPropsReturn> {
  try {
    const res = await api.post("/goal/progress", { goalId, amount });
    const data: AddGoalProgressPropsReturn = res.data;
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