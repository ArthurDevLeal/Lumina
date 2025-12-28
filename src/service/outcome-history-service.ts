import { OutcomeModel } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createOutcomeHistory = async ({ userId }: { userId: string }) => {
  const history = await prisma.outcomeHistory.create({ data: { userId } });
  if (history) return { success: true, data: history };
  return console.error("Error Creating new history");
};

const getUserOutcomeHistory = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const history = await prisma.outcomeHistory.findFirst({ where: { userId } });
  if (history) return { success: true, data: history };
  return console.error("Error finding the history");
};

const addOutcomeToHistory = async ({ outcome, userId }: { outcome: OutcomeModel; userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const history = await prisma.outcomeHistory.findFirst({ where: { userId } });
  if (!history) return console.error("History not found");

  const updatedHistory = await prisma.outcomeHistory.update({
    where: { id: history.id },
    data: {
      listOfOutcomes: {
        connect: { id: outcome.id },
      },
    },
  });

  if (updatedHistory) return { success: true, data: updatedHistory };
  return console.error("Error adding outcome to history");
};

const calculateTotals = async ({ historyId }: { historyId: string }) => {
  const history = await prisma.outcomeHistory.findFirst({
    where: { id: historyId },
    include: { listOfOutcomes: true },
  });

  if (!history) return console.error("History not found");

  const totalOutcome = history.listOfOutcomes.reduce((acc, outcome) => acc + outcome.value, 0);
  const fixedOutcome = history.listOfOutcomes
    .filter((outcome) => outcome.type === "Fixed")
    .reduce((acc, outcome) => acc + outcome.value, 0);
  const variableOutcome = history.listOfOutcomes
    .filter((outcome) => outcome.type === "Variable")
    .reduce((acc, outcome) => acc + outcome.value, 0);

  return { success: true, data: { totalOutcome, fixedOutcome, variableOutcome } };
};

const updateTotals = async ({ historyId }: { historyId: string }) => {
  const totals = await calculateTotals({ historyId });
  if (!totals) return console.error("Error calculating totals");

  const updatedHistory = await prisma.outcomeHistory.update({
    where: { id: historyId },
    data: {
      totalOutcome: totals.data.totalOutcome,
      fixedOutcome: totals.data.fixedOutcome,
      variableOutcome: totals.data.variableOutcome,
    },
  });

  if (updatedHistory) return { success: true, data: updatedHistory };
  return console.error("Error updating totals");
};

export {
  addOutcomeToHistory,
  calculateTotals,
  createOutcomeHistory,
  getUserOutcomeHistory,
  updateTotals,
};
