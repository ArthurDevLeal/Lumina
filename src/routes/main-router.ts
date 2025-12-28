import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { categoryController } from "../controllers/category-controller";
import { incomeController } from "../controllers/income-controller";
import { outcomeController } from "../controllers/outcome-controller";
import { outcomeHistoryController } from "../controllers/outcome-history-controller";
import { userController } from "../controllers/user-controller";
import { AuthMiddleware } from "../middleware/auth";
import { incomeHistoryController } from "../controllers/income-history-controller";
import { goalController } from "../controllers/goal-controller";
import { TransactionController } from "../controllers/transaction-controller";

const mainRouter = Router();

const userMainController = new userController();
const authMainController = new authController();
const outcomeMainController = new outcomeController();
const incomeMainController = new incomeController();
const outcomeHistoryMainController = new outcomeHistoryController();
const incomeHistoryMainController = new incomeHistoryController();
const categoryMainController = new categoryController();
const goalMainController = new goalController();
const transactionMainController = new TransactionController();
// Auth routes
mainRouter.post("/auth/login", authMainController.authenticate);
mainRouter.post("/auth/register", userMainController.store);

// User routes
mainRouter.post("/user/profile", AuthMiddleware, userMainController.index);
mainRouter.put("/user", AuthMiddleware, userMainController.update);
mainRouter.delete("/user", AuthMiddleware, userMainController.delete);
mainRouter.patch("/user/balance/adjust", AuthMiddleware, userMainController.adjustBalance);
mainRouter.put("/user/balance/set", AuthMiddleware, userMainController.setBalance);
mainRouter.patch("/user/saving/adjust", AuthMiddleware, userMainController.adjustSaving);
mainRouter.put("/user/saving/set", AuthMiddleware, userMainController.setSaving);

mainRouter.get("/transactions/monthly", AuthMiddleware, transactionMainController.getMonthlyTransactions);
mainRouter.get("/transactions/month", AuthMiddleware, transactionMainController.getTransactionsByMonth);

// Outcome routes
mainRouter.post("/outcome", AuthMiddleware, outcomeMainController.store);
mainRouter.get("/outcome/:id", AuthMiddleware, outcomeMainController.index);
mainRouter.get("/outcomes", AuthMiddleware, outcomeMainController.indexMany);
mainRouter.put("/outcome", AuthMiddleware, outcomeMainController.update);
mainRouter.delete("/outcome", AuthMiddleware, outcomeMainController.delete);
mainRouter.get("/outcomes/category", AuthMiddleware, outcomeMainController.indexByCategory);

// Income routes
mainRouter.post("/income", AuthMiddleware, incomeMainController.store);
mainRouter.get("/income/:id", AuthMiddleware, incomeMainController.index);
mainRouter.get("/incomes", AuthMiddleware, incomeMainController.indexMany);
mainRouter.put("/income", AuthMiddleware, incomeMainController.update);
mainRouter.delete("/income", AuthMiddleware, incomeMainController.delete);
mainRouter.get("/income/category", AuthMiddleware, incomeMainController.indexByCategory);

// Outcome History routes
mainRouter.get("/outcome-history", AuthMiddleware, outcomeHistoryMainController.index);
mainRouter.post("/outcome-history", AuthMiddleware, outcomeHistoryMainController.store);
mainRouter.patch("/outcome-history/totals", AuthMiddleware, outcomeHistoryMainController.updateTotals);

// Income History routes
mainRouter.get("/income-history", AuthMiddleware, incomeHistoryMainController.index);
mainRouter.post("/income-history", AuthMiddleware, incomeHistoryMainController.store);
mainRouter.patch("/income-history/totals", AuthMiddleware, incomeHistoryMainController.updateTotals);

// Category routes
mainRouter.post("/category/sum", AuthMiddleware, categoryMainController.sumMoneySpent);
mainRouter.get("/category/stats", AuthMiddleware, categoryMainController.getCategoryStats);
mainRouter.get("/categories", AuthMiddleware, categoryMainController.indexMany);
mainRouter.post("/category", AuthMiddleware, categoryMainController.store);
mainRouter.delete("/category", AuthMiddleware, categoryMainController.delete);
mainRouter.put("/category", AuthMiddleware, categoryMainController.update);
mainRouter.get("/category/:id", AuthMiddleware, categoryMainController.index);

mainRouter.post("/goal/progress", AuthMiddleware, goalMainController.addProgress);
mainRouter.get("/goal/stats", AuthMiddleware, goalMainController.getGoalStats);
mainRouter.get("/goal/:id", AuthMiddleware, goalMainController.index);
mainRouter.post("/goal", AuthMiddleware, goalMainController.store);
mainRouter.get("/goals", AuthMiddleware, goalMainController.indexMany);
mainRouter.put("/goal", AuthMiddleware, goalMainController.update);
mainRouter.delete("/goal", AuthMiddleware, goalMainController.delete);

export { mainRouter };
