import { Request, Response } from "express";
import { getMonthlyTransactions, getTransactionsByMonth } from "../service/transactions-service";

export class TransactionController {
  async getMonthlyTransactions(req: Request, res: Response) {
    const userId = req.userId;
    const { startDate, endDate } = req.query;

    const params: {
      userId: string;
      startDate?: Date;
      endDate?: Date;
    } = { userId };

    if (startDate && typeof startDate === "string") {
      params.startDate = new Date(startDate);
    }

    if (endDate && typeof endDate === "string") {
      params.endDate = new Date(endDate);
    }

    const transactionsReq = await getMonthlyTransactions(params);

    if (!transactionsReq || !transactionsReq.success) {
      return res.status(400).json({
        error: "Error fetching monthly transactions",
      });
    }

    return res.json({
      message: "Monthly transactions fetched successfully",
      data: transactionsReq.data,
    });
  }

  async getTransactionsByMonth(req: Request, res: Response) {
    const userId = req.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        error: "Year and month are required",
      });
    }

    const yearNum = parseInt(year as string, 10);
    const monthNum = parseInt(month as string, 10);

    if (isNaN(yearNum) || isNaN(monthNum)) {
      return res.status(400).json({
        error: "Year and month must be valid numbers",
      });
    }

    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        error: "Month must be between 1 and 12",
      });
    }

    const transactionsReq = await getTransactionsByMonth({
      userId,
      year: yearNum,
      month: monthNum,
    });

    if (!transactionsReq || !transactionsReq.success) {
      return res.status(400).json({
        error: "Error fetching transactions for the specified month",
      });
    }

    return res.json({
      message: "Transactions for the month fetched successfully",
      data: transactionsReq.data,
    });
  }
}
