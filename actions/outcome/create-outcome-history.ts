import api from "@/api/api";
import { CreateOutcomeHistoryPropsReturn } from "@/types/outcome/type";

export async function createOutcomeHistory(): Promise<CreateOutcomeHistoryPropsReturn> {
  try {
    const res = await api.post("/outcome-history");
    const data: CreateOutcomeHistoryPropsReturn = res.data;
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