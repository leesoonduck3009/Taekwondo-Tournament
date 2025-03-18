import { PaginationRequest } from "../dtos/api.request";
import { Pagination } from "../dtos/api.response";
import {
  PlayerAddRangeItemDto,
  PlayerDto,
  PlayerRequestDto,
} from "../dtos/Player.dto";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Player } from "../models/Player";
import { TournamentGroup } from "../models/TournamentGroup";

export class PlayerService {
  public async createPlayer(request: PlayerRequestDto): Promise<PlayerDto> {
    const tournamentGroup = await TournamentGroup.findById(
      request.tournamentGroupId
    );

    if (!tournamentGroup)
      throw new NotFoundException(
        `Tournament Group with id '${request.tournamentGroupId}' has not found`
      );

    const player = new Player({ ...request });
    const savedPlayer = await player.save();

    return {
      id: savedPlayer.id,
      name: savedPlayer.name,
      studentId: savedPlayer.studentId,
      tournamentGroupId: savedPlayer.tournamentGroupId.toString(),
      weight: savedPlayer.weight,
      gender: savedPlayer.gender,
    };
  }

  public async addRangePlayers(
    players: PlayerAddRangeItemDto[],
    tournamentGroupId: string
  ): Promise<PlayerDto[]> {
    const tournamentGroup = await TournamentGroup.findById(tournamentGroupId);
    
    if (!tournamentGroup)
      throw new NotFoundException(
        `Tournament Group with id '${tournamentGroupId}' has not found`
      );

    const newPlayers = players.map((player) => ({
      ...player,
      tournamentGroupId: tournamentGroupId,
    }));

    const savedPlayers = await Player.insertMany(newPlayers);

    return savedPlayers.map((player) => ({
      id: player.id,
      name: player.name,
      studentId: player.studentId,
      tournamentGroupId: player.tournamentGroupId.toString(),
      weight: player.weight,
      gender: player.gender,
    }));
  }

  public async getAllPlayeres(paginationRequest: PaginationRequest) {
    //TODO: Implement this getAllPlayer as method
    const limit = paginationRequest.limit ?? 10;
    const index = paginationRequest.index ?? 0;

    const players = await Player.find()
      .skip(limit * index)
      .limit(limit);

    const response: Pagination<PlayerDto> = {
      items: players.map((player) => ({
        id: player.id,
        name: player.name,
        studentId: player.studentId,
        tournamentGroupId: player.tournamentGroupId.toString(),
        weight: player.weight,
        gender: player.gender,
      })),
      index: index,
      limit: limit,
    };

    return response;
  }

  public async getPlayerById(id: string): Promise<PlayerDto> {
    //TODO: Implement this getPlayerById method
    const player = await Player.findById(id);
    if (!player)
      throw new NotFoundException(`Player with id '${id}' has not found`);
    return {
      id: player.id,
      name: player.name,
      studentId: player.studentId,
      weight: player.weight,
      gender: player.gender,
      tournamentGroupId: player.tournamentGroupId.toString(),
    };
  }

  public async updatePlayerById(
    id: string,
    request: PlayerRequestDto
  ): Promise<PlayerDto> {
    //TODO: Implement this updatePlayerById method
    if (request.tournamentGroupId) {
      const tournamentGroup = await TournamentGroup.findById(
        request.tournamentGroupId
      );
      if (!tournamentGroup)
        throw new NotFoundException(
          `Tournament Group with id '${request.tournamentGroupId}' has not found`
        );
    }

    const updatedPlayer = await Player.findByIdAndUpdate(id, request, {
      new: true,
    });

    if (!updatedPlayer)
      throw new NotFoundException(`Player with id '${id}' has not found`);

    return {
      id: updatedPlayer.id,
      name: updatedPlayer.name,
      studentId: updatedPlayer.studentId,
      weight: updatedPlayer.weight,
      gender: updatedPlayer.gender,
      tournamentGroupId: updatedPlayer.tournamentGroupId.toString(),
    };
  }

  public async deletePlayerById(id: string) {
    //TODO: Implement this deletePlayerById method
    const player = await Player.findByIdAndDelete(id);

    if (!player)
      throw new NotFoundException(`Player with id '${id}' has not found`);
    await Player.findByIdAndDelete(id);
    return true;
  }
}
