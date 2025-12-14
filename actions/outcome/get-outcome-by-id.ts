"use client"
import api from "@/api/api";
import { GetOutcomeByIdPropsReturn } from "@/types/outcome/type";

export async function getOutcomeById(id: string): Promise<GetOutcomeByIdPropsReturn> {
  try {
    const res = await api.get(`/outcome/${id}`);
    const data: GetOutcomeByIdPropsReturn = res.data;
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