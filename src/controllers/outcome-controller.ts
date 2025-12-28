import { Request, Response } from "express";
import { OutcomeUncheckedCreateInput } from "../../generated/prisma/models";
import { sumMoneySpent } from "../service/category-service";
import { updateTotals } from "../service/outcome-history-service";
import {
  createOutcome,
  deleteOutcome,
  getAllOutcomesByUser,
  getOutcomeById,
  getOutcomesByCategory,
  updateOutcome,
} from "../service/outcome-service";

export class outcomeController {
  async store(req: Request, res: Response) {
    const userId = req.userId;
    const outcome: Omit<OutcomeUncheckedCreateInput, "userId"> = req.body;
    const outcomeReq = await createOutcome({
      data: {
        ...outcome,
        userId,
      },
    });
    if (!outcomeReq || !outcomeReq.success) return res.status(400).json({ error: "Error creating outcome" });
    const categoryReq = await sumMoneySpent({ categoryId: outcome.categoryId });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error summing category" });
    const outcomeHistoryReq = await updateTotals({ historyId: outcome.outcomeHistoryId });
    if (!outcomeHistoryReq || !outcomeHistoryReq.success)
      return res.status(400).json({ error: "Error updating outcome history" });
    return res.json({
      message: "Outcome created successfully",
      data: outcomeReq.data,
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    const outcomeReq = await getOutcomeById({ id });
    if (!outcomeReq || !outcomeReq.success) return res.status(400).json({ error: "Error finding outcome" });
    return res.json({
      message: "Outcome finded successfully",
      data: outcomeReq.data,
    });
  }

  async indexMany(req: Request, res: Response) {
    const id = req.userId;
    const outcomeReq = await getAllOutcomesByUser({ userId: id });
    if (!outcomeReq || !outcomeReq.success) return res.status(400).json({ error: "Error finding outcomes" });
    return res.json({
      message: "Outcomes finded successfully",
      data: outcomeReq.data,
    });
  }

  async update(req: Request, res: Response) {
    const { id, data }: { id: string; data: OutcomeUncheckedCreateInput } = req.body;
    const outcomeReq = await updateOutcome({ id, data });
    if (!outcomeReq || !outcomeReq.success) return res.status(400).json({ error: "Error updating outcome" });
    const categoryReq = await sumMoneySpent({ categoryId: data.categoryId });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error summing category" });
    return res.json({
      message: "Outcome updated successfully",
      data: outcomeReq.data,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const outcomeReq = await deleteOutcome({ id });
    if (!outcomeReq || !outcomeReq.success) return res.status(400).json({ error: "Error deleting outcome" });
    const categoryReq = await sumMoneySpent({ categoryId: outcomeReq.data.categoryId });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error summing category" });
    return res.json({
      message: "Outcome deleted successfully",
      data: outcomeReq.data,
    });
  }

  async indexByCategory(req: Request, res: Response) {
    const id = req.userId;
    const { categoryId } = req.body;
    const outcomeReq = await getOutcomesByCategory({ userId: id, categoryId });
    if (!outcomeReq || !outcomeReq.success)
      return res.status(400).json({ error: "Error finding outcome by categories" });
    return res.json({
      message: "Outcomes finded by category successfully",
      data: outcomeReq.data,
    });
  }
}
