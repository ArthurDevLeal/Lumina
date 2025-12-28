import { GoalUncheckedCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

const createGoal = async ({ data }: { data: GoalUncheckedCreateInput }) => {
  const goal = await prisma.goal.create({ data });
  if (goal) return { success: true, data: goal };
  return console.error("Error Creating new goal");
};

const getGoalById = async ({ id }: { id: string }) => {
  const goal = await prisma.goal.findFirst({ 
    where: { id },
    include: {
      goalProgress: true,
    },
  });
  if (goal) return { success: true, data: goal };
  return console.error("Error finding the goal");
};

const getGoalsByUser = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");
  const goals = await prisma.goal.findMany({ 
    where: { userId },
    include: {
      goalProgress: true,
    },
  });
  if (goals) return { success: true, data: goals };
  return console.error("Error finding all the goals");
};

const updateGoal = async ({ id, data }: { id: string; data: GoalUncheckedCreateInput }) => {
  const goal = await prisma.goal.update({ where: { id }, data });
  if (goal) return { success: true, data: goal };
  return console.error("Error updating goal");
};

const deleteGoal = async ({ id }: { id: string }) => {
  const goal = await prisma.goal.delete({ where: { id } });
  if (goal) return { success: true, data: goal };
  return console.error("Error deleting goal");
};

const addGoalProgress = async ({ goalId, amount }: { goalId: string; amount: number }) => {
  const goal = await prisma.goal.findFirst({ where: { id: goalId } });
  if (!goal) return console.error("Goal not found");

  const progress = await prisma.goalProgress.create({
    data: {
      goalId,
      amount,
    },
  });

  const updatedGoal = await prisma.goal.update({
    where: { id: goalId },
    data: { 
      currentValue: goal.currentValue + amount,
    },
  });

  if (progress && updatedGoal) 
    return { success: true, data: { progress, goal: updatedGoal } };
  return console.error("Error adding progress to goal");
};

const getGoalStats = async ({ userId }: { userId: string }) => {
  const user = await findUser({ id: userId });
  if (!user) return console.error("User dont exist");

  const goals = await prisma.goal.findMany({
    where: { userId },
    include: {
      goalProgress: true,
    },
  });

  const stats = goals.map((goal) => {
    const totalProgress = goal.goalProgress.reduce((acc, progress) => acc + progress.amount, 0);
    const progressPercentage = goal.targetValue > 0 
      ? (goal.currentValue / goal.targetValue) * 100 
      : 0;
    
    return {
      id: goal.id,
      name: goal.name,
      type: goal.type,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      calculatedProgress: totalProgress,
      progressPercentage: Math.min(progressPercentage, 100),
      status: goal.status,
      progressCount: goal.goalProgress.length,
    };
  });

  if (stats) return { success: true, data: stats };
  return console.error("Error getting goal stats");
};

export {
  createGoal,
  deleteGoal,
  getGoalById,
  getGoalsByUser,
  updateGoal,
  addGoalProgress,
  getGoalStats,
};