import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoriesByUser,
  getCategoryById,
  getCategoryStats,
  sumMoneySpent,
  updateCategory,
} from "../service/category-service";
import { CategoryUncheckedCreateInput } from "../../generated/prisma/models";

export class categoryController {
  async store(req: Request, res: Response) {
    const userId = req.userId;
    const category: Omit<CategoryUncheckedCreateInput, "userId"> = req.body;
    const categoryReq = await createCategory({
      data: {
        ...category,
        userId,
      },
    });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error creating category" });
    return res.json({
      message: "Category created successfully",
      data: categoryReq.data,
    });
  }
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const categoryReq = await getCategoryById({ id });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error finding category" });
    return res.json({
      message: "Category finded successfully",
      data: categoryReq.data,
    });
  }
  async indexMany(req: Request, res: Response) {
    const id = req.userId;
    const categoryReq = await getCategoriesByUser({ userId: id });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error finding categories" });
    return res.json({
      message: "Categories finded successfully",
      data: categoryReq.data,
    });
  }
  async update(req: Request, res: Response) {
    const { id, data }: { id: string; data: CategoryUncheckedCreateInput } = req.body;
    const categoryReq = await updateCategory({ id, data });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error updating category" });
    return res.json({
      message: "Category updated successfully",
      data: categoryReq.data,
    });
  }
  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const categoryReq = await deleteCategory({ id });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error deleting category" });
    return res.json({
      message: "Category deleted successfully",
      data: categoryReq.data,
    });
  }
  async sumMoneySpent(req: Request, res: Response) {
    const { id } = req.body;
    const categoryReq = await sumMoneySpent({ categoryId: id });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error summing category" });
    return res.json({
      message: "Category sum successfully",
      data: categoryReq.data,
    });
  }
  async getCategoryStats(req: Request, res: Response) {
    const id = req.userId;
    const categoryReq = await getCategoryStats({ userId: id });
    if (!categoryReq || !categoryReq.success)
      return res.status(400).json({ error: "Error getting stats from category" });
    return res.json({
      message: "Category stats getted successfully",
      data: categoryReq.data,
    });
  }
}
