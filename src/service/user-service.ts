import { UserCreateInput, UserUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

const createUser = async (data: UserCreateInput) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  if (user) return { success: true, data: user };
  return console.error("Error Creating new user");
};

const findUser = async ({ email, id }: { email?: string; id?: string }) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email }, { id }] },
  });
  if (user) return { success: true, data: user };
  return console.error("Error finding the user");
};

const updateUser = async ({ id, data }: { id: string; data: UserUpdateInput }) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      avatarUrl: data.avatarUrl,
    },
  });
  if (user) return { success: true, data: user };
  return console.error("Error updating the user");
};

const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  if (user) return { success: true, data: user };
  return console.error("Error deleting the user");
};

const adjustBalance = async ({ id, amount }: { id: string; amount: number }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error adjusting user balance:", error);
    return { success: false, data: null };
  }
};

const adjustSaving = async ({ id, amount }: { id: string; amount: number }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        saving: {
          increment: amount,
        },
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error adjusting user saving:", error);
    return { success: false, data: null };
  }
};

const setBalance = async ({ id, amount }: { id: string; amount: number }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        balance: amount,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error setting user balance:", error);
    return { success: false, data: null };
  }
};

const setSaving = async ({ id, amount }: { id: string; amount: number }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        saving: amount,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error setting user saving:", error);
    return { success: false, data: null };
  }
};

export { adjustBalance, adjustSaving, createUser, deleteUser, findUser, setBalance, setSaving, updateUser };
