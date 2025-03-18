import { Router, Request, Response, NextFunction } from "express";
import { v1Controller } from "../../controllers/v1";
import multer from "multer";

const route = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.get("/", v1Controller.Player.getAllPlayers);
route.post("/", v1Controller.Player.createPlayer);
route.post("/range", v1Controller.Player.addRangePlayers);
route.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    await v1Controller.Player.uploadPlayersByExcel(req, res, next);
  }
);
route.get("/:id", v1Controller.Player.getPlayerById);
route.put("/:id", v1Controller.Player.updatePlayerById);
route.delete("/:id", v1Controller.Player.deletePlayerById);

export default route;
