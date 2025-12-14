import {
  loginUserProps,
  loginUserPropsReturn,
  RegisterUserProps,
  RegisterUserPropsReturn,
} from "@/types/auth-type";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
export async function registerUser({
  name,
  email,
  password,
}: RegisterUserProps): Promise<RegisterUserPropsReturn> {
  if (!name || name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email format");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const res = await api.post("/auth/register", {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    const data: RegisterUserPropsReturn = res.data;

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

export async function loginUser({ email, password }: loginUserProps): Promise<loginUserPropsReturn> {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email format");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const res = await api.post("/auth/login", {
      email: email.toLowerCase().trim(),
      password,
    });

    const data: loginUserPropsReturn = res.data;

    if (!data.user || !data.user.id) {
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
