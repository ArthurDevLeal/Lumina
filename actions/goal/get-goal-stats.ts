import api from "@/api/api";
import { GoalStatsPropsReturn } from "@/types/goal/type";

export async function getGoalStats(): Promise<GoalStatsPropsReturn> {
  try {
    const res = await api.get("/goal/stats");
    const data: GoalStatsPropsReturn = res.data;
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