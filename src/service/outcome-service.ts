import { OutcomeUncheckedCreateInput, OutcomeUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createOutcome = async ({ data }: { data: OutcomeUncheckedCreateInput }) => {
  const outcome = await prisma.outcome.create({ data });
  if (outcome) return { success: true, data: outcome };
  return console.error("Error Creating new outcome");
};

const getOutcomeById = async ({ id }: { id: string }) => {
  const outcome = await prisma.outcome.findFirst({ where: { id } });
  if (outcome) return { success: true, data: outcome };
  return console.error("Error finding the outcome");
};

const getAllOutcomesByUser = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const outcome = await prisma.outcome.findMany({ where: { userId } });
  if (outcome) return { success: true, data: outcome };
  return console.error("Error finding all the outcomes");
};

const updateOutcome = async ({ id, data }: { id: string; data: OutcomeUpdateInput }) => {
  const outcome = await prisma.outcome.update({ where: { id }, data });
  if (outcome) return { success: true, data: outcome };
  return console.error("Error updating outcome");
};

const deleteOutcome = async ({ id }: { id: string }) => {
  const outcome = await prisma.outcome.delete({ where: { id } });
  if (outcome) return { success: true, data: outcome };
  return console.error("Error deleting outcome");
};

const getOutcomesByCategory = async ({ userId, categoryId }: { userId: string; categoryId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const outcomes = await prisma.outcome.findMany({
    where: {
      userId,
      categoryId,
    },
  });
  if (outcomes) return { success: true, data: outcomes };
  return console.error("Error finding outcomes by category");
};

export {
  createOutcome,
  deleteOutcome,
  getAllOutcomesByUser,
  getOutcomeById,
  getOutcomesByCategory,
  updateOutcome,
};
