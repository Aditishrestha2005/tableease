import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import tableService from "../services/table.service";

class TableController {
  async createTable(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.createTable(
        req.user!.userId,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Table created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTables(
    _req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.getAllTables();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTableById(
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.getTableById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTable(
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.updateTable(
        req.user!.userId,
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Table updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTable(
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.deleteTable(
        req.user!.userId,
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAvailableTables(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { date, time, guests } = req.query as {
        date: string;
        time: string;
        guests: string;
      };

      const result =
        await tableService.getAvailableTables(
          date,
          time,
          Number(guests)
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TableController();