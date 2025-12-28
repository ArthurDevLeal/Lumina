import { Request, Response } from "express";
import {
  createOutcomeHistory,
  getUserOutcomeHistory,
  updateTotals,
} from "../service/outcome-history-service";

export class outcomeHistoryController {
  async index(req: Request, res: Response) {
    const id = req.userId;
    const outcomeHistoryReq = await getUserOutcomeHistory({ userId: id });
    if (!outcomeHistoryReq || !outcomeHistoryReq.success)
      return res.status(400).json({ error: "Error finding outcome History" });
    return res.json({
      message: "Outcome history finded successfully",
      data: outcomeHistoryReq.data,
    });
  }
  async store(req: Request, res: Response) {
    const id = req.userId;
    const outcomeHistoryReq = await createOutcomeHistory({ userId: id });
    if (!outcomeHistoryReq || !outcomeHistoryReq.success)
      return res.status(400).json({ error: "Error creating outcome History" });
    return res.json({
      message: "Outcome history created successfully",
      data: outcomeHistoryReq.data,
    });
  }

  async updateTotals(req: Request, res: Response) {
    const { id } = req.body;
    const outcomeHistoryReq = await updateTotals({ historyId: id });
    if (!outcomeHistoryReq || !outcomeHistoryReq.success)
      return res.status(400).json({ error: "Error updating outcome history" });
    return res.json({
      message: "Outcome history updated successfully",
      data: outcomeHistoryReq.data,
    });
  }
}
