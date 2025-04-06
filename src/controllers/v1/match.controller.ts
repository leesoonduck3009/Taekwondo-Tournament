import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../dtos/api.response";
import {
  AddRangeMatchRequestDto,
  CreateMatchRequestDto,
  MatchAddRangeItem,
  MatchDto,
  WinMatchRequestDto,
} from "../../dtos/Match.dto";
import { v1Service } from "../../services/index.service";
import { ExcelExtractionService } from "../../utils/ExcelExtractionService";

export class MatchController {
  public async createMatch(
    req: Request<{}, {}, CreateMatchRequestDto>,
    res: Response<ApiResponse<MatchDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const match = await v1Service.match.createMatch(body);
      res.status(201).json(ApiResponse.success<MatchDto>(match));
    } catch (err) {
      next(err);
    }
  }

  public async getAllMatchesByTournaments(
    req: Request<
      { tournamentGroupId: string },
      {},
      {},
      { isAvailable: boolean }
    >,
    res: Response<ApiResponse<MatchDto[]>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const matches = await v1Service.match.getAllMatchesByTournaments(
        req.params.tournamentGroupId,
        req.query
      );
      res.status(200).json(ApiResponse.success<MatchDto[]>(matches));
    } catch (err) {
      next(err);
    }
  }

  public async getMatchById(
    req: Request<{ id: string }>,
    res: Response<ApiResponse<MatchDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const match = await v1Service.match.getMatchById(req.params.id);
      res.status(200).json(ApiResponse.success<MatchDto>(match));
    } catch (err) {
      next(err);
    }
  }

  public async uploadMatchesByExcel(
    req: Request<{}, {}, { file: Express.Multer.File }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const file = req.file;

      if (!file) {
        throw new Error("File is required");
      }

      const excelService = new ExcelExtractionService<MatchAddRangeItem>();

      const sheetDataResponse =
        excelService.extractDataWithSheetNameFromExcel(file);

      const request: AddRangeMatchRequestDto[] = sheetDataResponse.map(
        (sheetData) => {
          return {
            tournamentGroupId: sheetData.sheetName,
            matches: sheetData.data,
          };
        }
      );
      const matches = await v1Service.match.addRangeMatch(request);
      res.status(200).json(ApiResponse.success(matches));
    } catch (err) {
      next(err);
    }
  }

  public async exportMatchesToExcel(
    req: Request<{}, {}, {}, { fileName: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileName = req.query.fileName ?? "Tournament Matches";
      const matches = await v1Service.match.exportAllMatchesToExcel(fileName);
      res.setHeader("Content-Type", matches.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}.xlsx"`
      );
      res.status(200).send(matches.buffer);
    } catch (err) {
      next(err);
    }
  }

  public async winMatchById(
    req: Request<{ id: string }, {}, WinMatchRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await v1Service.match.winMatch(req.params.id, req.body);
      res.status(200).json(ApiResponse.success(response));
    } catch (err) {
      next(err);
    }
  }
  public async updateMatchById(
    req: Request<{ id: string }>,
    res: Response<ApiResponse<MatchDto>>,
    next: NextFunction
  ): Promise<void> {
    // TODO: Implement this method
    // try {
    //   const match = await v1Service.match.updateMatchById(req.params.id);
    //   res.status(200).json(ApiResponse.success<MatchDto>(match));
    // } catch (err) {
    //   next(err);
    // }
  }
}
