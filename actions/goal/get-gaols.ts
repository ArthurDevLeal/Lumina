import api from "@/api/api";
import { GetGoalsPropsReturn } from "@/types/goal/type";

export async function getGoals(): Promise<GetGoalsPropsReturn> {
  try {
    const res = await api.get("/goals");
    const data: GetGoalsPropsReturn = res.data;
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