import e from "express";
import { PlayerDto } from "./Player.dto";

export interface CreateRoundRequestDto {
  matchId: string;
  roundNumber: number;
}

export interface UpdateRoundRequestDto {
  winnerId: string;
  gameTime: number;
}

export interface RoundDto {
  id: string;
  roundNumber: number;
  winner?: PlayerDto;
  gameTime: number;
}
