import api from "@/api/api";
import { GetGoalByIdPropsReturn } from "@/types/goal/type";

interface GetGoalByIdProps {
  id: string;
}

export async function getGoalById({
  id,
}: GetGoalByIdProps): Promise<GetGoalByIdPropsReturn> {
  try {
    const res = await api.get(`/goal/${id}`);
    const data: GetGoalByIdPropsReturn = res.data;
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