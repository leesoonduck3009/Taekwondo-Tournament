import { Gender } from "../enums/Gender";

export interface CreateTournamentRequestDto {
  gender: Gender;
  weightClass: string;
}
export interface TournamentGroupDto {
  id: string;
  totalPlayers: number;
  gender: Gender;
  weightClass: string;
}
