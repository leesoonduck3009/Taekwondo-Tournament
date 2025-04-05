import { Types } from "mongoose";
import {
  AddRangeMatchRequestDto,
  CreateMatchRequestDto,
  MatchDto,
  WinMatchRequestDto,
} from "../dtos/Match.dto";
import { IMatch, Match } from "../models/Match";
import { NotFoundException } from "../exceptions/NotFoundException";
import { TournamentGroup } from "../models/TournamentGroup";
import { PaginationRequest } from "../dtos/api.request";
import { IPlayer, Player } from "../models/Player";
import mapper from "../mapping/Mapper";
import { MappingProfileName } from "../mapping/profiles/MappingProfileName";
import { Pagination } from "../dtos/api.response";
import { InvalidModelException } from "../exceptions/InvalidModelException";

export class MatchService {
  public async createMatch(request: CreateMatchRequestDto) {
    const tournamentGroup = await TournamentGroup.findById(
      request.tournamentGroupId
    );

    if (!tournamentGroup)
      throw new NotFoundException(
        `Tournament Group with id '${request.tournamentGroupId}' has not found`
      );

    const match = new Match({ ...request, matchTime: new Date() });
    await match.save();
    return mapper.map<IMatch, MatchDto>(
      MappingProfileName.matchToDtoProfile,
      match
    );
    //TODO: Implement this CreateMatch method
  }

  public async getAllMatchesByTournaments(
    tournamentGroupId: string,
    params?: { isAvailable: boolean }
  ): Promise<MatchDto[]> {
    const matches = await Match.find({
      tournamentGroupId: new Types.ObjectId(tournamentGroupId),
    })
      .populate({ path: "redPlayerId" })
      .populate({ path: "bluePlayerId" })
      .populate({ path: "winnerId" });
    if (params?.isAvailable ?? false) {
      const availableMatches = matches.filter(
        (match) => !match.isFinished && match.redPlayerId && match.bluePlayerId
      );
      return mapper.mapArray<IMatch, MatchDto>(
        MappingProfileName.matchToDtoProfile,
        availableMatches
      );
    }
    return mapper.mapArray<IMatch, MatchDto>(
      MappingProfileName.matchToDtoProfile,
      matches
    );
  }

  public async getMatchById(id: string): Promise<MatchDto> {
    const match = await Match.findById(id)
      .populate({ path: "redPlayerId" })
      .populate({ path: "bluePlayerId" })
      .populate({ path: "winnerId" })
      .exec();

    if (!match)
      throw new NotFoundException(`Match with id '${id}' has not found`);

    return mapper.map<IMatch, MatchDto>(
      MappingProfileName.matchToDtoProfile,
      match
    );
  }

  public async addRangeMatch(
    matcheRequests: AddRangeMatchRequestDto[]
  ): Promise<boolean> {
    const matchPromises = matcheRequests.map(async (matchRequest) => {
      // 1️⃣ Kiểm tra Tournament Group
      let tournamentGroup = await TournamentGroup.findById(
        matchRequest.tournamentGroupId
      );

      if (!tournamentGroup) {
        throw new NotFoundException(
          `Tournament Group with id '${matchRequest.tournamentGroupId}' has not found`
        );
      }

      // 2️⃣ Lấy danh sách playerId cần kiểm tra
      const playerIds = matchRequest.matches.flatMap(
        ({ redPlayerId, bluePlayerId }) => {
          const respone = [];
          if (redPlayerId) respone.push(redPlayerId);
          if (bluePlayerId) respone.push(bluePlayerId);
          return respone;
        }
      );
      // 3️⃣ Truy vấn tất cả players trong một lần
      const players = await Player.find({ _id: { $in: playerIds } });

      // 4️⃣ Tạo danh sách playerId hợp lệ
      const validPlayerIds = [...players.map((player) => player.id.toString())];
      // 5️⃣ Tạo danh sách trận đấu mới (chưa có `parentMatchId`)
      const matchMap = new Map<string, IMatch>();

      const matches = matchRequest.matches.map((match) => {
        if (
          match.redPlayerId &&
          match.bluePlayerId &&
          (!validPlayerIds.includes(match.redPlayerId) ||
            !validPlayerIds.includes(match.bluePlayerId))
        ) {
          throw new NotFoundException(
            `Player with id '${
              !validPlayerIds.includes(match.redPlayerId)
                ? match.redPlayerId
                : match.bluePlayerId
            }' has not found`
          );
        }

        // Tạo match nhưng chưa gán `parentMatchId`
        const newMatch = new Match({
          redPlayerId: match.redPlayerId,
          bluePlayerId: match.bluePlayerId,
          tournamentGroupId: matchRequest.tournamentGroupId,
          parentMatchSide: match.parentMatchSide,
          name: match.name,
          isFinished: match.isFinished ?? false,
          matchNo: match.matchNo,
        });

        matchMap.set(match.name, newMatch);
        return newMatch;
      });

      // 6️⃣ Lưu tất cả match trước
      const insertedMatches = await Match.insertMany(matches);
      // 7️⃣ Gán `parentMatchId` sau khi lưu
      for (const match of matchRequest.matches) {
        if (match.parentMatchName) {
          const parentMatch = matchMap.get(match.parentMatchName);
          if (parentMatch) {
            const currentMatch = matchMap.get(match.name);
            if (currentMatch) {
              currentMatch.parentMatchId = parentMatch.id;
              await currentMatch.save();
            }
          }
        }
      }

      return true;
    });

    await Promise.all(matchPromises);
    return true;
  }

  public async winMatch(id: string, request: WinMatchRequestDto) {
    const match = await Match.findById(id);
    if (!match)
      throw new NotFoundException(`Match with id '${id}' has not found`);
    if (
      request.redRoundWins < 0 ||
      request.blueRoundWins < 0 ||
      request.redRoundWins === request.blueRoundWins
    ) {
      throw new InvalidModelException("Invalid redRoundWins or blueWins");
    }
    if (request.blueRoundWins > request.redRoundWins) {
      match.winnerId = match.bluePlayerId;
    } else {
      match.winnerId = match.redPlayerId;
    }
    match.isFinished = true;
    match.blueWins = request.blueRoundWins;
    match.redWins = request.redRoundWins;

    if (match.parentMatchId) {
      const parentMatch = await Match.findById(match.parentMatchId);
      if (parentMatch) {
        if (match.parentMatchSide === "Red") {
          parentMatch.redPlayerId = match.winnerId;
        } else {
          parentMatch.bluePlayerId = match.winnerId;
        }
        await parentMatch.save();
      }
    }

    await match.save();
    return mapper.map<IMatch, MatchDto>(
      MappingProfileName.matchToDtoProfile,
      match
    );
  }

  public updateMatchById(id: string) {
    //TODO: Implement this updateMatchById method
  }

  public deleteMatchById(id: string) {
    //TODO: Implement this deleteMatchById method
  }
}
