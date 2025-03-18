import { TournamentGroupService } from "./tournament.service";

class V1Service {
  TournamentGroup = new TournamentGroupService();
}
export const v1Service = new V1Service();
