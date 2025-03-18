import { Router } from "express";
import { v1Controller } from "../../controllers/v1";
const route = Router();
route.get("/", v1Controller.TournamentGroup.getAll);
route.post("/", v1Controller.TournamentGroup.create);
route.get("/:id", v1Controller.TournamentGroup.getById);
route.put("/:id", v1Controller.TournamentGroup.updateById);
route.delete("/:id", v1Controller.TournamentGroup.deleteById);
export default route;
