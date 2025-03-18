import { TournamentGroupController } from "./tournament.controller";

class ControllerV1 {
  TournamentGroup = new TournamentGroupController();
}
export const controllerV1 = new ControllerV1();
