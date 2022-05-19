import { Router } from "express";

import { getResult } from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get("/pool/:id/result", getResult);

export default resultRouter;
