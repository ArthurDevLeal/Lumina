import api from "@/api/api";
import { UpdateOutcomeHistoryTotalsPropsReturn } from "@/types/outcome/type";

interface UpdateOutcomeHistoryTotalsProps {
  id: string;
}

export async function updateOutcomeHistoryTotals({
  id,
}: UpdateOutcomeHistoryTotalsProps): Promise<UpdateOutcomeHistoryTotalsPropsReturn> {
  try {
    const res = await api.patch("/outcome-history/totals", { id });
    const data: UpdateOutcomeHistoryTotalsPropsReturn = res.data;
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