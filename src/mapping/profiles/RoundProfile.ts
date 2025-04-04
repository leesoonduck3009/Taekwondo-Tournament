import { RoundDto } from "../../dtos/Round.dto";
import { IPlayer } from "../../models/Player";
import { IRound } from "../../models/Round";
import mapper from "../Mapper";
import { Profile } from "./BaseProfile";
import { MappingProfileName } from "./MappingProfileName";

export const roundToDtoProfile = new Profile<IRound, RoundDto>((round) => {
  const winner = round.winnerId as IPlayer | undefined;

  return {
    id: round.id,
    roundNumber: round.roundNumber,
    gameTime: round.gameTime,
    winner: mapper.map(MappingProfileName.playerToDtoProfile, winner),
  };
});
