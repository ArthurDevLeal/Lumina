import { prisma } from "../lib/prisma";
import { findUser } from "./user-service";

interface MonthlyTransactionData {
  date: Date;
  totalIncome: number;
  fixedIncome: number;
  variableIncome: number;
  totalOutcome: number;
  fixedOutcome: number;
  variableOutcome: number;
  balance: number;
}

interface GetMonthlyTransactionsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
}

const getMonthlyTransactions = async ({
  userId,
  startDate,
  endDate,
}: GetMonthlyTransactionsParams) => {
  const user = await findUser({ id: userId });
  if (!user) {
    return console.error("User does not exist");
  }

  const dateFilter: { gte?: Date; lte?: Date } = {};
  if (startDate) dateFilter.gte = startDate;
  if (endDate) dateFilter.lte = endDate;

  const [incomeHistories, outcomeHistories] = await Promise.all([
    prisma.incomeHistory.findMany({
      where: {
        userId,
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.outcomeHistory.findMany({
      where: {
        userId,
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const monthlyDataMap = new Map<string, MonthlyTransactionData>();

  incomeHistories.forEach((income) => {
    const monthKey = getMonthKey(income.createdAt);
    
    if (!monthlyDataMap.has(monthKey)) {
      monthlyDataMap.set(monthKey, {
        date: new Date(income.createdAt.getFullYear(), income.createdAt.getMonth(), 1),
        totalIncome: 0,
        fixedIncome: 0,
        variableIncome: 0,
        totalOutcome: 0,
        fixedOutcome: 0,
        variableOutcome: 0,
        balance: 0,
      });
    }

    const data = monthlyDataMap.get(monthKey)!;
    data.totalIncome = income.totalIncome;
    data.fixedIncome = income.fixedIncome;
    data.variableIncome = income.variableIncome;
  });

  outcomeHistories.forEach((outcome) => {
    const monthKey = getMonthKey(outcome.createdAt);
    
    if (!monthlyDataMap.has(monthKey)) {
      monthlyDataMap.set(monthKey, {
        date: new Date(outcome.createdAt.getFullYear(), outcome.createdAt.getMonth(), 1),
        totalIncome: 0,
        fixedIncome: 0,
        variableIncome: 0,
        totalOutcome: 0,
        fixedOutcome: 0,
        variableOutcome: 0,
        balance: 0,
      });
    }

    const data = monthlyDataMap.get(monthKey)!;
    data.totalOutcome = outcome.totalOutcome;
    data.fixedOutcome = outcome.fixedOutcome;
    data.variableOutcome = outcome.variableOutcome;
  });

  const monthlyData = Array.from(monthlyDataMap.values())
    .map((data) => ({
      ...data,
      balance: data.totalIncome - data.totalOutcome,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { success: true, data: monthlyData };
};


const getTransactionsByMonth = async ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: number;
  month: number;
}) => {
  const user = await findUser({ id: userId });
  if (!user) {
    return console.error("User does not exist");
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const [incomeHistory, outcomeHistory] = await Promise.all([
    prisma.incomeHistory.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        listOfIncomes: true,
      },
    }),
    prisma.outcomeHistory.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        listOfOutcomes: {
          include: {
            category: true,
          },
        },
      },
    }),
  ]);

  const data: MonthlyTransactionData = {
    date: startDate,
    totalIncome: incomeHistory?.totalIncome ?? 0,
    fixedIncome: incomeHistory?.fixedIncome ?? 0,
    variableIncome: incomeHistory?.variableIncome ?? 0,
    totalOutcome: outcomeHistory?.totalOutcome ?? 0,
    fixedOutcome: outcomeHistory?.fixedOutcome ?? 0,
    variableOutcome: outcomeHistory?.variableOutcome ?? 0,
    balance: (incomeHistory?.totalIncome ?? 0) - (outcomeHistory?.totalOutcome ?? 0),
  };

  return {
    success: true,
    data: {
      ...data,
      incomes: incomeHistory?.listOfIncomes ?? [],
      outcomes: outcomeHistory?.listOfOutcomes ?? [],
    },
  };
};


const getMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export { getMonthlyTransactions, getTransactionsByMonth };
export type { MonthlyTransactionData };