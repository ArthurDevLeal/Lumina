"use client"
import api from "@/api/api";
import { GetCategoriesPropsReturn } from "@/types/category/type";

export async function getCategories(): Promise<GetCategoriesPropsReturn> {
  try {
    const res = await api.get("/categories");
    const data: GetCategoriesPropsReturn = res.data;
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