import { PlayerService } from "./player.service";
import { TournamentGroupService } from "./tournament.service";

class V1Service {
  TournamentGroup = new TournamentGroupService();
  Player = new PlayerService();
}
export const v1Service = new V1Service();
