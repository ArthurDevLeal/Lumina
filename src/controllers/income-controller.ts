import { Request, Response } from "express";
import { IncomeUncheckedCreateInput } from "../../generated/prisma/models";
import { updateTotals } from "../service/income-history-service";
import {
  createIncome,
  deleteIncome,
  getAllIncomesByUser,
  getIncomeById,
  getIncomesByCategory,
  updateIncome,
} from "../service/income-service";

export class incomeController {
  async store(req: Request, res: Response) {
    const userId = req.userId;
    const income: Omit<IncomeUncheckedCreateInput, "userId"> = req.body;
    const incomeReq = await createIncome({
      data: {
        ...income,
        userId,
      },
    });
    if (!incomeReq || !incomeReq.success) return res.status(400).json({ error: "Error creating income" });
    const incomeHistoryReq = await updateTotals({ historyId: income.incomeHistoryId });
    if (!incomeHistoryReq || !incomeHistoryReq.success)
      return res.status(400).json({ error: "Error updating income history" });
    return res.json({
      message: "income created successfully",
      data: incomeReq.data,
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    const incomeReq = await getIncomeById({ id });
    if (!incomeReq || !incomeReq.success) return res.status(400).json({ error: "Error finding income" });
    return res.json({
      message: "income finded successfully",
      data: incomeReq.data,
    });
  }

  async indexMany(req: Request, res: Response) {
    const id = req.userId;
    const incomeReq = await getAllIncomesByUser({ userId: id });
    if (!incomeReq || !incomeReq.success) return res.status(400).json({ error: "Error finding incomes" });
    return res.json({
      message: "incomes finded successfully",
      data: incomeReq.data,
    });
  }

  async update(req: Request, res: Response) {
    const { id, data }: { id: string; data: IncomeUncheckedCreateInput } = req.body;
    const incomeReq = await updateIncome({ id, data });
    if (!incomeReq || !incomeReq.success) return res.status(400).json({ error: "Error updating income" });

    return res.json({
      message: "income updated successfully",
      data: incomeReq.data,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const incomeReq = await deleteIncome({ id });
    if (!incomeReq || !incomeReq.success) return res.status(400).json({ error: "Error deleting income" });

    return res.json({
      message: "income deleted successfully",
      data: incomeReq.data,
    });
  }

  async indexByCategory(req: Request, res: Response) {
    const id = req.userId;
    const { categoryName } = req.body;
    const incomeReq = await getIncomesByCategory({ userId: id, categoryName });
    if (!incomeReq || !incomeReq.success)
      return res.status(400).json({ error: "Error finding income by categories" });
    return res.json({
      message: "incomes finded by category successfully",
      data: incomeReq.data,
    });
  }
}
