// Compare this snippet from src/controllers/v1/tournament-group.controller.ts:
import { NextFunction, Request, Response } from "express";
import { PaginationRequest } from "../../dtos/api.request";
import { ApiResponse, Pagination } from "../../dtos/api.response";
import {
  CreateTournamentRequestDto,
  TournamentGroupDto,
} from "../../dtos/Tournament.dto";
import { v1Service } from "../../services/index.service";
export class TournamentGroupController {
  public async create(
    req: Request<{}, {}, CreateTournamentRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const tournamentGroup = await v1Service.TournamentGroup.createTournament(
        body
      );
      res
        .status(201)
        .json(ApiResponse.success<TournamentGroupDto>(tournamentGroup));
    } catch (err) {
      next(err);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tournamentGroups =
        await v1Service.TournamentGroup.getAllTournaments(
          req.body as PaginationRequest
        );
      res
        .status(200)
        .json(
          ApiResponse.success<Pagination<TournamentGroupDto>>(tournamentGroups)
        );
    } catch (err) {
      next(err);
    }
  }

  public async getById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tournamentGroup = await v1Service.TournamentGroup.getTournamentById(
        req.params.id
      );
      res
        .status(200)
        .json(ApiResponse.success<TournamentGroupDto>(tournamentGroup));
    } catch (err) {
      next(err);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const tournamentGroup =
        await v1Service.TournamentGroup.updateTournamentById(
          req.params.id,
          req.body
        );
      res.status(200).json(tournamentGroup);
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await v1Service.TournamentGroup.deleteTournamentById(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
