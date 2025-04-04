import { PlayerDto } from "../../dtos/Player.dto";
import { IPlayer } from "../../models/Player";
import mapper from "../Mapper";
import { Profile } from "./BaseProfile";
import { MappingProfileName } from "./MappingProfileName";

export const playerToDtoProfile = new Profile<IPlayer, PlayerDto>((player) => ({
  id: player.id,
  name: player.name,
  studentId: player.studentId,
  avatarUrl: player.avatarUrl,
  gender: player.gender,
  weight: player.weight,
}));
