import api from "@/api/api";
import { UpdateUserProps, UpdateUserPropsReturn } from "@/types/user/type";

export async function updateUser({
  name,
  email,
  password,
  avatarUrl
}: UpdateUserProps): Promise<UpdateUserPropsReturn> {
  if (name !== undefined && name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  if (email !== undefined && !email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if (password !== undefined && password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  


  try {
    const updateData: Partial<UpdateUserProps> = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (email !== undefined) {
      updateData.email = email.toLowerCase().trim();
    }

    if (password !== undefined) {
      updateData.password = password;
    }
     if (avatarUrl !== undefined) {
      updateData.avatarUrl = avatarUrl;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update");
    }

    const res = await api.put("/user", updateData);
    const data: UpdateUserPropsReturn = res.data;

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