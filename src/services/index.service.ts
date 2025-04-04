import { MatchService } from "./match.service";
import { PlayerService } from "./player.service";
import { RoundService } from "./round.service";
import { TournamentGroupService } from "./tournament.service";

class V1Service {
  TournamentGroup = new TournamentGroupService();
  Player = new PlayerService();
  match = new MatchService();
  round = new RoundService();
}
export const v1Service = new V1Service();
