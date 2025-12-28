import api from "@/api/api";
import { GetMonthlyTransactionsPropsReturn } from "@/types/transactions/type";

interface GetMonthlyTransactionsParams {
  startDate?: string;
  endDate?: string;
}

export async function getMonthlyTransactions(
  params?: GetMonthlyTransactionsParams
): Promise<GetMonthlyTransactionsPropsReturn> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.startDate) {
      queryParams.append("startDate", params.startDate);
    }
    
    if (params?.endDate) {
      queryParams.append("endDate", params.endDate);
    }

    const queryString = queryParams.toString();
    const url = `/transactions/monthly${queryString ? `?${queryString}` : ""}`;

    const res = await api.get(url);
    const data: GetMonthlyTransactionsPropsReturn = res.data;

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