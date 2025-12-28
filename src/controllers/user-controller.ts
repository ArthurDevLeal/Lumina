import { Request, Response } from "express";
import { userViewModel } from "../../view-model/user-view-model";
import { hashPassword } from "../service/auth-service";
import { createIncomeHistory } from "../service/income-history-service";
import { createOutcomeHistory } from "../service/outcome-history-service";
import {
  adjustBalance,
  adjustSaving,
  createUser,
  deleteUser,
  findUser,
  setBalance,
  setSaving,
  updateUser,
} from "../service/user-service";

export class userController {
  async index(req: Request, res: Response) {
    const id = req.userId;
    const { email } = req.body;
    let userReq;
    if (!email) {
      userReq = await findUser({ id });
    } else {
      userReq = await findUser({ email });
    }
    if (!userReq || !userReq.success) return res.status(400).json({ error: "User not found" });
    return res.json({
      message: "User retrieved successfully",
      data: userViewModel(userReq.data),
    });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await findUser({ email });
    if (userExists) return res.status(400).json({ error: "User Already exist" });

    const hash_password = await hashPassword(password);

    const userReq = await createUser({ email, password: hash_password, name });
    if (!userReq || !userReq.success) return res.status(400).json({ error: "Error creating User" });

    const outcomeHistoryReq = await createOutcomeHistory({ userId: userReq.data.id });
    if (!outcomeHistoryReq || !outcomeHistoryReq.success)
      return res.status(400).json({ error: "Error creating outcome History" });

    const incomeHistoryReq = await createIncomeHistory({ userId: userReq.data.id });
    if (!incomeHistoryReq || !incomeHistoryReq.success)
      return res.status(400).json({ error: "Error creating income History" });

    return res.json({
      message: "User created successfully",
      data: userViewModel(userReq.data),
    });
  }

  async update(req: Request, res: Response) {
    const id = req.userId;
    const { name, email, password, avatarUrl } = req.body;

    const userExists = await findUser({ id });
    if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });

    const updateData: any = {};
    if (name) {
      updateData.name = name;
    }
    if (email) {
      if (email !== userExists.data.email) {
        const emailExists = await findUser({ email });
        if (emailExists && emailExists.success) {
          return res.status(409).json({
            error: "Email already in use by another user",
          });
        }
        updateData.email = email;
      }
    }
    if (password) {
      const hash_password = await hashPassword(password);
      updateData.password = hash_password;
    }
    if (avatarUrl) {
      updateData.avatarUrl = avatarUrl;
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update",
      });
    }

    const userReq = await updateUser({ id, data: updateData });
    if (!userReq || !userReq.success) return res.status(500).json({ error: "Error updating user" });
    return res.json({
      message: "User updated successfully",
      data: userViewModel(userReq.data),
    });
  }

  async delete(req: Request, res: Response) {
    const id = req.userId;
    const userExists = await findUser({ id });
    if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });

    const userReq = await deleteUser(id);
    if (!userReq || !userReq.success) return res.status(400).json({ error: "Error deleting User" });
    return res.json({
      message: "User deleted successfully",
      data: userViewModel(userReq.data),
    });
  }

  async adjustBalance(req: Request, res: Response) {
    const id = req.userId;
    const { amount } = req.body;

    try {
      if (typeof amount !== "number") return res.status(400).json({ error: "Amount must be a number" });

      if (amount === 0) return res.status(400).json({ error: "Amount cannot be zero" });

      const userExists = await findUser({ id });
      if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });

      const balanceReq = await adjustBalance({ id, amount });

      if (!balanceReq.data || !balanceReq.success)
        return res.status(500).json({ error: "Error adjusting balance" });

      return res.json({
        message: amount > 0 ? "Balance increased successfully" : "Balance decreased successfully",
        previousBalance: userExists.data.balance,
        adjustment: amount,
        newBalance: balanceReq.data.balance,
      });
    } catch (error) {
      console.error("Error in adjustBalance:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async adjustSaving(req: Request, res: Response) {
    const id = req.userId;
    const { amount } = req.body;

    try {
      if (typeof amount !== "number") return res.status(400).json({ error: "Amount must be a number" });
      if (amount === 0) return res.status(400).json({ error: "Amount cannot be zero" });

      const userExists = await findUser({ id });
      if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });

      const savingReq = await adjustSaving({ id, amount });
      if (!savingReq.data || !savingReq.success)
        return res.status(500).json({ error: "Error adjusting saving" });

      return res.json({
        message: amount > 0 ? "Saving increased successfully" : "Saving decreased successfully",
        previousSaving: userExists.data.saving,
        adjustment: amount,
        newSaving: savingReq.data.saving,
      });
    } catch (error) {
      console.error("Error in adjustSaving:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async setBalance(req: Request, res: Response) {
    const id = req.userId;
    const { amount } = req.body;

    try {
      if (typeof amount !== "number") return res.status(400).json({ error: "Amount must be a number" });

      if (amount < 0) return res.status(400).json({ error: "Balance cannot be negative" });

      const userExists = await findUser({ id });
      if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });

      const balanceReq = await setBalance({ id, amount });
      if (!balanceReq.data || !balanceReq.success)
        return res.status(500).json({ error: "Error setting balance" });

      return res.json({
        message: "Balance set successfully",
        previousBalance: userExists.data.balance,
        newBalance: balanceReq.data.balance,
      });
    } catch (error) {
      console.error("Error in setBalance:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async setSaving(req: Request, res: Response) {
    const id = req.userId;
    const { amount } = req.body;

    try {
      if (typeof amount !== "number") return res.status(400).json({ error: "Amount must be a number" });
      if (amount < 0) return res.status(400).json({ error: "Saving cannot be negative" });
      const userExists = await findUser({ id });
      if (!userExists || !userExists.success) return res.status(400).json({ error: "User not found" });
      const savingReq = await setSaving({ id, amount });
      if (!savingReq.data || !savingReq.success)
        return res.status(500).json({ error: "Error setting saving" });
      return res.json({
        message: "Saving set successfully",
        previousSaving: userExists.data.saving,
        newSaving: savingReq.data.saving,
      });
    } catch (error) {
      console.error("Error in setSaving:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
