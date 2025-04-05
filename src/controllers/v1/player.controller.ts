import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../dtos/api.response";
import {
  PlayerAddRangeRequestDto,
  PlayerDto,
  PlayerRequestDto,
} from "../../dtos/Player.dto";
import { v1Service } from "../../services/index.service";
import { PaginationRequest } from "../../dtos/api.request";
import { ExcelExtractionService } from "../../utils/ExcelExtractionService";

export class PlayerController {
  public async createPlayer(
    req: Request<{}, {}, PlayerRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const player = await v1Service.Player.createPlayer(body);
      res.status(201).json(ApiResponse.success<PlayerDto>(player));
    } catch (err) {
      next(err);
    }
  }

  public async addRangePlayers(
    req: Request<{}, {}, PlayerAddRangeRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const players = await v1Service.Player.addRangePlayers(body.items);
      res.status(201).json(ApiResponse.success<PlayerDto[]>(players));
    } catch (err) {
      next(err);
    }
  }

  public async getAllPlayers(
    req: Request<{}, {}, {}, PaginationRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const players = await v1Service.Player.getAllPlayeres(req.query);
      res.status(200).json(ApiResponse.success(players));
    } catch (err) {
      next(err);
    }
  }

  public async getPlayerById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const player = await v1Service.Player.getPlayerById(req.params.id);
      res.status(200).json(ApiResponse.success<PlayerDto>(player));
    } catch (err) {
      next(err);
    }
  }

  public async updatePlayerById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const player = await v1Service.Player.updatePlayerById(
        req.params.id,
        req.body
      );
      res.status(200).json(ApiResponse.success<PlayerDto>(player));
    } catch (err) {
      next(err);
    }
  }

  public async deletePlayerById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await v1Service.Player.deletePlayerById(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  public async uploadPlayersByExcel(
    req: Request<{}, {}, { file: Express.Multer.File; tournamentId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const excelService = new ExcelExtractionService<PlayerDto>();

      const players = excelService.extractDataFromExcel(req.file);
      console.log("players", players);
      const response = await v1Service.Player.addRangePlayers(players);
      res.status(200).json(ApiResponse.success<PlayerDto[]>(response));
    } catch (error: any) {
      next(error);
    }
  }
}
