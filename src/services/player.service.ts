import { PaginationRequest } from "../dtos/api.request";
import { Pagination } from "../dtos/api.response";
import {
  PlayerAddRangeItemDto,
  PlayerDto,
  PlayerRequestDto,
} from "../dtos/Player.dto";
import { NotFoundException } from "../exceptions/NotFoundException";
import mapper from "../mapping/Mapper";
import { MappingProfileName } from "../mapping/profiles/MappingProfileName";
import { IPlayer, Player } from "../models/Player";
import { TournamentGroup } from "../models/TournamentGroup";

export class PlayerService {
  public async createPlayer(request: PlayerRequestDto): Promise<PlayerDto> {
    const player = new Player({ ...request });
    const savedPlayer = await player.save();

    return {
      id: savedPlayer.id,
      name: savedPlayer.name,
      studentId: savedPlayer.studentId,
      weight: savedPlayer.weight,
      gender: savedPlayer.gender,
      avatarUrl: savedPlayer.avatarUrl,
    };
  }

  public async addRangePlayers(
    players: PlayerAddRangeItemDto[]
  ): Promise<PlayerDto[]> {
    const newPlayers = players.map((player) => ({
      ...player,
    }));

    const savedPlayers = await Player.insertMany(newPlayers);

    return savedPlayers.map((player) => ({
      id: player.id,
      name: player.name,
      studentId: player.studentId,
      weight: player.weight,
      gender: player.gender,
      avatarUrl: player.avatarUrl,
    }));
  }

  public async getAllPlayeres(paginationRequest: PaginationRequest) {
    const limit = paginationRequest.limit ?? 10;
    const index = paginationRequest.index ?? 0;

    const players = await Player.find()
      .skip(limit * index)
      .limit(limit);
    const total = await Player.countDocuments({});

    const response: Pagination<PlayerDto> = {
      items: mapper.mapArray<IPlayer, PlayerDto>(
        MappingProfileName.playerToDtoProfile,
        players
      ),
      index: index,
      total: total,
    };

    return response;
  }

  public async getAllWithTournamentGroupId(tournamentGroupId: string) {
    const players = await Player.find({ tournamentGroupId: tournamentGroupId });

    return players;
  }
  public async getPlayerById(id: string): Promise<PlayerDto> {
    //TODO: Implement this getPlayerById method
    const player = await Player.findById(id);
    if (!player)
      throw new NotFoundException(`Player with id '${id}' has not found`);
    return mapper.map<IPlayer, PlayerDto>(
      MappingProfileName.playerToDtoProfile,
      player
    );
  }

  public async updatePlayerById(
    id: string,
    request: PlayerRequestDto
  ): Promise<PlayerDto> {
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
      avatarUrl: updatedPlayer.avatarUrl,
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
