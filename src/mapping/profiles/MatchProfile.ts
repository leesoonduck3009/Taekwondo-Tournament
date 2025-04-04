import { MatchDto } from "../../dtos/Match.dto";
import { IMatch } from "../../models/Match";
import { IPlayer } from "../../models/Player";
import mapper from "../Mapper";
import { Profile } from "./BaseProfile";
import { MappingProfileName } from "./MappingProfileName";

export const matchToDtoProfile = new Profile<IMatch, MatchDto>((match) => {
  const redPlayer = match.redPlayerId as IPlayer | undefined;
  const bluePlayer = match.bluePlayerId as IPlayer | undefined;
  const winner = match.winnerId as IPlayer | undefined;
  const matchParent = match.parentMatchId as IMatch | undefined;
  return {
    id: match.id,
    name: match.name,
    parentMatchName: matchParent ? matchParent.name : undefined,
    tournamentGroupId: match.tournamentGroupId.toString(),
    redPlayer: redPlayer
      ? mapper.map(MappingProfileName.playerToDtoProfile, redPlayer)
      : undefined,
    bluePlayer: bluePlayer
      ? mapper.map(MappingProfileName.playerToDtoProfile, bluePlayer)
      : undefined,
    winner: winner
      ? mapper.map(MappingProfileName.playerToDtoProfile, winner)
      : undefined,
    redWins: match.redWins,
    blueWins: match.blueWins,
    isFinished: match.isFinished,
    matchTime: match.matchTime,
  };
});
