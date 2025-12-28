import api from "@/api/api";
import { CreateGoalPropsReturn } from "@/types/goal/type";

interface CreateGoalProps {
  name: string;
  type: string;
  targetValue?: number;
  currentValue?: number;
  finalDate?: Date;
  status: string;
}

export async function createGoal({
  name,
  type,
  targetValue,
  currentValue,
  finalDate,
  status,
}: CreateGoalProps): Promise<CreateGoalPropsReturn> {
  try {
    const res = await api.post("/goal", {
      name,
      type,
      targetValue,
      currentValue,
      finalDate,
      status,
    });
    const data: CreateGoalPropsReturn = res.data;
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