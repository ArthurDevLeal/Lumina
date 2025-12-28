import { Request, Response } from "express";
import {
  createGoal,
  deleteGoal,
  getGoalById,
  getGoalsByUser,
  updateGoal,
  addGoalProgress,
  getGoalStats,
} from "../service/goal-service";
import { GoalUncheckedCreateInput } from "../../generated/prisma/models";

export class goalController {
  async store(req: Request, res: Response) {
    const userId = req.userId;
    const goal: Omit<GoalUncheckedCreateInput, "userId"> = req.body;
    const goalReq = await createGoal({
      data: {
        ...goal,
        userId,
      },
    });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error creating goal" });
    return res.json({
      message: "Goal created successfully",
      data: goalReq.data,
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    const goalReq = await getGoalById({ id });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error finding goal" });
    return res.json({
      message: "Goal finded successfully",
      data: goalReq.data,
    });
  }

  async indexMany(req: Request, res: Response) {
    const id = req.userId;
    const goalReq = await getGoalsByUser({ userId: id });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error finding goals" });
    return res.json({
      message: "Goals finded successfully",
      data: goalReq.data,
    });
  }

  async update(req: Request, res: Response) {
    const { id, data }: { id: string; data: GoalUncheckedCreateInput } = req.body;
    const goalReq = await updateGoal({ id, data });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error updating goal" });
    return res.json({
      message: "Goal updated successfully",
      data: goalReq.data,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const goalReq = await deleteGoal({ id });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error deleting goal" });
    return res.json({
      message: "Goal deleted successfully",
      data: goalReq.data,
    });
  }

  async addProgress(req: Request, res: Response) {
    const { goalId, amount }: { goalId: string; amount: number } = req.body;
    const goalReq = await addGoalProgress({ goalId, amount });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error adding progress to goal" });
    return res.json({
      message: "Progress added successfully",
      data: goalReq.data,
    });
  }

  async getGoalStats(req: Request, res: Response) {
    const id = req.userId;
    const goalReq = await getGoalStats({ userId: id });
    if (!goalReq || !goalReq.success)
      return res.status(400).json({ error: "Error getting stats from goal" });
    return res.json({
      message: "Goal stats getted successfully",
      data: goalReq.data,
    });
  }
}