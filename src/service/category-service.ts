import { CategoryUncheckedCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createCategory = async ({ data }: { data: CategoryUncheckedCreateInput }) => {
  const category = await prisma.category.create({ data });
  if (category) return { success: true, data: category };
  return console.error("Error Creating new category");
};

const getCategoryById = async ({ id }: { id: string }) => {
  const category = await prisma.category.findFirst({ where: { id } });
  if (category) return { success: true, data: category };
  return console.error("Error finding the category");
};

const getCategoriesByUser = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const category = await prisma.category.findMany({ where: { userId } });
  if (category) return { success: true, data: category };
  return console.error("Error finding all the categories");
};

const updateCategory = async ({ id, data }: { id: string; data: CategoryUncheckedCreateInput }) => {
  const category = await prisma.category.update({ where: { id }, data });
  if (category) return { success: true, data: category };
  return console.error("Error updating category");
};

const deleteCategory = async ({ id }: { id: string }) => {
  const category = await prisma.category.delete({ where: { id } });
  if (category) return { success: true, data: category };
  return console.error("Error deleting category");
};

const sumMoneySpent = async ({ categoryId }: { categoryId: string }) => {
  const category = await prisma.category.findFirst({
    where: { id: categoryId },
    include: {
      outcomes: true,
    },
  });

  if (!category) return console.error("Category not found");

  const outcomesTotal = category.outcomes.reduce((acc, outcome) => acc + outcome.value, 0);
  const totalSpent = outcomesTotal;

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { moneySpent: totalSpent },
  });

  if (updatedCategory) return { success: true, data: { totalSpent, category: updatedCategory } };
  return console.error("Error updating money spent");
};

const getCategoryStats = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");

  const categories = await prisma.category.findMany({
    where: { userId },
    include: {
      outcomes: true,
    },
  });

  const stats = categories.map((category) => {
    const outcomesTotal = category.outcomes.reduce((acc, outcome) => acc + outcome.value, 0);
    const totalSpent = outcomesTotal;

    return {
      id: category.id,
      name: category.name,
      moneySpent: category.moneySpent,
      calculatedSpent: totalSpent,
      outcomesCount: category.outcomes.length,
    };
  });

  if (stats) return { success: true, data: stats };
  return console.error("Error getting category stats");
};

export {
  createCategory,
  deleteCategory,
  getCategoriesByUser,
  getCategoryById,
  getCategoryStats,
  sumMoneySpent,
  updateCategory,
};
