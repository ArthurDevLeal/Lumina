import { Request, Response } from "express";
import { createIncomeHistory, getUserincomeHistory, updateTotals } from "../service/income-history-service";

export class incomeHistoryController {
  async index(req: Request, res: Response) {
    const id = req.userId;
    const incomeHistoryReq = await getUserincomeHistory({ userId: id });
    if (!incomeHistoryReq || !incomeHistoryReq.success)
      return res.status(400).json({ error: "Error finding income History" });
    return res.json({
      message: "income history finded successfully",
      data: incomeHistoryReq.data,
    });
  }
  async store(req: Request, res: Response) {
    const id = req.userId;
    const incomeHistoryReq = await createIncomeHistory({ userId: id });
    if (!incomeHistoryReq || !incomeHistoryReq.success)
      return res.status(400).json({ error: "Error creating income History" });
    
    return res.json({
      message: "income history created successfully",
      data: incomeHistoryReq.data,
    });
  }

  async updateTotals(req: Request, res: Response) {
    const { id } = req.body;
    const incomeHistoryReq = await updateTotals({ historyId: id });
    if (!incomeHistoryReq || !incomeHistoryReq.success)
      return res.status(400).json({ error: "Error updating income history" });
    return res.json({
      message: "income history updated successfully",
      data: incomeHistoryReq.data,
    });
  }
}
