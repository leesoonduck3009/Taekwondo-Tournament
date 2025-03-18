import { Router, Request, Response, NextFunction } from "express";
import { v1Controller } from "../../controllers/v1";
import multer from "multer";
const route = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
route.get("/", v1Controller.TournamentGroup.getAll);
route.post("/", v1Controller.TournamentGroup.create);
route.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    await v1Controller.TournamentGroup.uploadTournamentsByExcel(req, res, next);
  }
);
route.get("/:id", v1Controller.TournamentGroup.getById);
route.put("/:id", v1Controller.TournamentGroup.updateById);
route.delete("/:id", v1Controller.TournamentGroup.deleteById);
export default route;
