import { Router, Request, Response, NextFunction } from "express";

import { v1Controller } from "../../controllers/v1";
import multer from "multer";
const route = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
route.get(
  "/tournament/:tournamentGroupId",
  v1Controller.Match.getAllMatchesByTournaments
);

route.get("/export-excel-data", v1Controller.Match.exportMatchesToExcel);

route.post("/", v1Controller.Match.createMatch);
route.put("/win/:id", v1Controller.Match.winMatchById);
route.get("/:id", v1Controller.Match.getMatchById);
route.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    await v1Controller.Match.uploadMatchesByExcel(req, res, next);
  }
);
export default route;
