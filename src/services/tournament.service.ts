import mongoose from "mongoose";
import { PaginationRequest } from "../dtos/api.request";
import {
  CreateTournamentRequestDto,
  TournamentGroupDto,
} from "../dtos/Tournament.dto";
import { TournamentGroup } from "../models/TournamentGroup";
import { Pagination } from "../dtos/api.response";
import { NotFoundException } from "../exceptions/NotFoundException";
import { DEFAULT_INDEX, DEFAULT_LIMIT } from "../constants/Pagination";

export class TournamentGroupService {
  constructor() {}
  public async createTournament(
    tournamentData: CreateTournamentRequestDto
  ): Promise<TournamentGroupDto> {
    try {
      const tournament = new TournamentGroup({
        totalPlayers: 0, // Initial totalPlayers is 0
        ...tournamentData,
      });
      const savedTournament = await tournament.save();
      return {
        id: savedTournament.id,
        totalPlayers: savedTournament.totalPlayers,
        gender: savedTournament.gender,
        weightClass: savedTournament.weightClass,
      };
    } catch (error) {
      throw new Error(`Error creating tournament: ${error}`);
    }
  }
  public async getAllTournaments(pagination: PaginationRequest) {
    const limit = pagination.limit ?? DEFAULT_LIMIT;
    const index = pagination.index ?? DEFAULT_INDEX;
    const tournaments = await TournamentGroup.find()
      .skip(limit * index)
      .limit(limit);
    const respone: Pagination<TournamentGroupDto> = {
      index: index,
      limit: limit,
      items: tournaments.map((tournament) => ({
        id: tournament.id,
        totalPlayers: tournament.totalPlayers,
        gender: tournament.gender,
        weightClass: tournament.weightClass,
      })),
    };
    return respone;
  }
  public async getTournamentById(id: string) {
    const tournament = await TournamentGroup.findById(id);
    if (!tournament)
      throw new NotFoundException(`Tournament with Id ${id} not found`);
    return {
      id: tournament.id,
      totalPlayers: tournament.totalPlayers,
      gender: tournament.gender,
      weightClass: tournament.weightClass,
    };
  }
  public async updateTournamentById(
    id: string,
    tournamentData: Partial<CreateTournamentRequestDto>
  ) {
    try {
      const updatedTournament = await TournamentGroup.findByIdAndUpdate(
        id,
        tournamentData,
        { new: true }
      );
      if (!updatedTournament)
        throw new NotFoundException(`Tournament with Id ${id} not found`);
      return {
        id: updatedTournament.id,
        totalPlayers: updatedTournament.totalPlayers,
        gender: updatedTournament.gender,
        weightClass: updatedTournament.weightClass,
      };
    } catch (error) {
      throw new Error(`Error updating tournament: ${error}`);
    }
  }
  public async deleteTournamentById(id: string) {
    const tournament = await TournamentGroup.findById(id);
    if (!tournament)
      throw new NotFoundException(`Tournament with Id ${id} not found`);
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
    await TournamentGroup.findByIdAndDelete(id);
    return true;
  }
}
