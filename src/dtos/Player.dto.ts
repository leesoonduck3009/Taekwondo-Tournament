import { Gender } from "../enums/Gender";

export interface PlayerRequestDto {
  name: string;
  studentId: string;
  gender: Gender;
  weight: number;
  avatarUrl: string;
}
export interface PlayerAddRangeItemDto {
  name: string;
  studentId: string;
  gender: Gender;
  weight: number;
  avatarUrl?: string;
}
export interface PlayerAddRangeRequestDto {
  items: PlayerAddRangeItemDto[];
}
export class PlayerDto {
  id!: string;
  name!: string;
  studentId!: string;
  gender!: Gender;
  weight!: number;
  avatarUrl?: string;
}
