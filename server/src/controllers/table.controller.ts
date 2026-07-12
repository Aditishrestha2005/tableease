import { NextFunction, Request, Response } from "express";
import tableService from "../services/table.service";

class TableController {

  async createTable(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.createTable(req.body);

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
    _req: Request,
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
    req: Request<{ id: string }>,
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
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.updateTable(
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
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await tableService.deleteTable(
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
}

export default new TableController();