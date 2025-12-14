"use client"
import api from "@/api/api";
import { GetCategoryByIdPropsReturn } from "@/types/category/type";

export async function getCategoryById(id: string): Promise<GetCategoryByIdPropsReturn> {
  try {
    const res = await api.get(`/category/${id}`);
    const data: GetCategoryByIdPropsReturn = res.data;
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