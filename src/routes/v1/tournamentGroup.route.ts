import { Router } from "express";
import { controllerV1 } from "../../controllers/v1";
const route = Router();
route.get("/", controllerV1.TournamentGroup.getAll);
route.post("/", controllerV1.TournamentGroup.create);
route.get("/:id", controllerV1.TournamentGroup.getById);
route.put("/:id", controllerV1.TournamentGroup.updateById);
route.delete("/:id", controllerV1.TournamentGroup.deleteById);
export default route;
