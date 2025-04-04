import { Types } from "mongoose";
import {
  CreateRoundRequestDto,
  RoundDto,
  UpdateRoundRequestDto,
} from "../dtos/Round.dto";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Match } from "../models/Match";
import { Round } from "../models/Round";
import { IPlayer } from "../models/Player";
import mapper from "../mapping/Mapper";
import { MappingProfileName } from "../mapping/profiles/MappingProfileName";

export class RoundService {
  async createRound(request: CreateRoundRequestDto): Promise<RoundDto> {
    const round = new Round({ ...request });

    await round.save();
    await Match.findByIdAndUpdate(request.matchId, {
      $push: { rounds: round },
    });

    return mapper.map(MappingProfileName.roundToDtoProfile, round);
  }

  async updateRound(
    id: string,
    request: UpdateRoundRequestDto
  ): Promise<RoundDto> {
    const round = await Round.findById(id);

    if (!round)
      throw new NotFoundException(`Round with id '${id}' has not found`);

    round.winnerId = new Types.ObjectId(request.winnerId);
    round.gameTime = request.gameTime;

    await round.save();
    return mapper.map(MappingProfileName.roundToDtoProfile, round);
  }

  async getRoundById(id: string): Promise<RoundDto> {
    const round = await Round.findById(id).populate("winnerId");
    if (!round)
      throw new NotFoundException(`Round with id '${id}' has not found`);
    return mapper.map(MappingProfileName.roundToDtoProfile, round);
  }

  async getRoundsByMatchId(matchId: string): Promise<RoundDto[]> {
    const rounds = await Round.find({ matchId }).populate("winnerId");
    return mapper.mapArray(MappingProfileName.roundToDtoProfile, rounds);
  }
}
