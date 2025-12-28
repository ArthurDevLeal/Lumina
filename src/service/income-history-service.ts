import { IncomeModel } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createIncomeHistory = async ({ userId }: { userId: string }) => {
  const history = await prisma.incomeHistory.create({ data: { userId } });
  if (history) return { success: true, data: history };
  return console.error("Error Creating new history");
};

const getUserincomeHistory = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const history = await prisma.incomeHistory.findFirst({ where: { userId } });
  if (history) return { success: true, data: history };
  return console.error("Error finding the history");
};

const addincomeToHistory = async ({ income, userId }: { income: IncomeModel; userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const history = await prisma.incomeHistory.findFirst({ where: { userId } });
  if (!history) return console.error("History not found");

  const updatedHistory = await prisma.incomeHistory.update({
    where: { id: history.id },
    data: {
      listOfIncomes: {
        connect: { id: income.id },
      },
    },
  });

  if (updatedHistory) return { success: true, data: updatedHistory };
  return console.error("Error adding income to history");
};

const calculateTotals = async ({ historyId }: { historyId: string }) => {
  const history = await prisma.incomeHistory.findFirst({
    where: { id: historyId },
    include: { listOfIncomes: true },
  });

  if (!history) return console.error("History not found");

  const totalincome = history.listOfIncomes.reduce((acc, income) => acc + income.value, 0);
  const fixedincome = history.listOfIncomes
    .filter((income) => income.type === "Fixed")
    .reduce((acc, income) => acc + income.value, 0);
  const variableincome = history.listOfIncomes
    .filter((income) => income.type === "Variable")
    .reduce((acc, income) => acc + income.value, 0);

  return { success: true, data: { totalincome, fixedincome, variableincome } };
};

const updateTotals = async ({ historyId }: { historyId: string }) => {
  const totals = await calculateTotals({ historyId });
  if (!totals) return console.error("Error calculating totals");

  const updatedHistory = await prisma.incomeHistory.update({
    where: { id: historyId },
    data: {
      totalIncome: totals.data.totalincome,
      fixedIncome: totals.data.fixedincome,
      variableIncome: totals.data.variableincome,
    },
  });

  if (updatedHistory) return { success: true, data: updatedHistory };
  return console.error("Error updating totals");
};

export {
  addincomeToHistory,
  calculateTotals,
  createIncomeHistory,
  getUserincomeHistory,
  updateTotals,
};
