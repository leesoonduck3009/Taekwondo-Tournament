import { Gender } from "../enums/Gender";

export interface PlayerRequestDto {
  name: string;
  studentId: string;
  tournamentGroupId: string;
  gender: Gender;
  weight: number;
}
export interface PlayerAddRangeItemDto {
  name: string;
  studentId: string;
  gender: Gender;
  weight: number;
}
export interface PlayerAddRangeRequestDto {
  items: PlayerAddRangeItemDto[];
  tournamentGroupId: string;
}
export interface PlayerDto {
  id: string;
  name: string;
  studentId: string;
  tournamentGroupId: string;
  gender: Gender;
  weight: number;
}
