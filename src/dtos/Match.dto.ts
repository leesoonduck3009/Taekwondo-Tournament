import { MatchSide } from "../models/Match";
import { PlayerDto } from "./Player.dto";

export interface CreateMatchRequestDto {
  tournamentGroupId: string;
  redPlayerId: string;
  bluePlayerId: string;
}

export class MatchDto {
  id!: string;
  name!: string;
  tournamentGroupId!: string;
  redPlayer?: PlayerDto;
  bluePlayer?: PlayerDto;
  redWins!: number;
  blueWins!: number;
  matchNo!: number;
  winner?: PlayerDto;
  matchTime!: Date;
  parentMatchName?: string;
  isFinished!: boolean;
}

export interface WinMatchRequestDto {
  redRoundWins: number;
  blueRoundWins: number;
}
export interface AddRangeMatchRequestDto {
  matches: PlayerAddRangeItemDto[];
  tournamentGroupId: string;
}

export interface PlayerAddRangeItemDto {
  redPlayerId: string;
  bluePlayerId: string;
  parentMatchName: string;
  name: string;
  matchNo: number;
  parentMatchSide: MatchSide;
  isFinished?: boolean;
  isLoseWinCase?: boolean;
  loseParentMatchSide?: MatchSide;
}
