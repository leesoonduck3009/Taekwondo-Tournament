import { MatchController } from "./match.controller";
import { PlayerController } from "./player.controller";
import { TournamentGroupController } from "./tournament.controller";

class V1Controller {
  TournamentGroup = new TournamentGroupController();
  Player = new PlayerController();
  Match = new MatchController();
}

export const v1Controller = new V1Controller();
