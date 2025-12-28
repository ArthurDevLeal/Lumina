import { IncomeUncheckedCreateInput, IncomeUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createIncome = async ({ data }: { data: IncomeUncheckedCreateInput }) => {
  const Income = await prisma.income.create({ data });
  if (Income) return { success: true, data: Income };
  return console.error("Error Creating new Income");
};

const getIncomeById = async ({ id }: { id: string }) => {
  const Income = await prisma.income.findFirst({ where: { id } });
  if (Income) return { success: true, data: Income };
  return console.error("Error finding the Income");
};

const getAllIncomesByUser = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const Income = await prisma.income.findMany({ where: { userId } });
  if (Income) return { success: true, data: Income };
  return console.error("Error finding all the Incomes");
};

const updateIncome = async ({ id, data }: { id: string; data: IncomeUpdateInput }) => {
  const Income = await prisma.income.update({ where: { id }, data });
  if (Income) return { success: true, data: Income };
  return console.error("Error updating Income");
};

const deleteIncome = async ({ id }: { id: string }) => {
  const Income = await prisma.income.delete({ where: { id } });
  if (Income) return { success: true, data: Income };
  return console.error("Error deleting Income");
};

const getIncomesByCategory = async ({ userId, categoryName }: { userId: string; categoryName: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const Incomes = await prisma.income.findMany({
    where: {
      userId,
      category: categoryName,
    },
  });
  if (Incomes) return { success: true, data: Incomes };
  return console.error("Error finding Incomes by category");
};

export { createIncome, deleteIncome, getAllIncomesByUser, getIncomeById, getIncomesByCategory, updateIncome };
