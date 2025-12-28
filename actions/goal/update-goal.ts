import api from "@/api/api";
import { UpdateGoalPropsReturn } from "@/types/goal/type";

interface UpdateGoalProps {
  id: string;
  data: {
    name?: string;
    type?: string;
    targetValue?: number;
    currentValue?: number;
    finalDate?: Date;
    status?: string;
  };
}

export async function updateGoal({
  id,
  data,
}: UpdateGoalProps): Promise<UpdateGoalPropsReturn> {
  try {
    const res = await api.put("/goal", { id, data });
    const responseData: UpdateGoalPropsReturn = res.data;
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