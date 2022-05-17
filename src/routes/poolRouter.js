import {Router} from "express";

import { createPool, getPools } from "../controllers/pollController.js";

const poolRouter = Router();

poolRouter.post("/pool", createPool);
poolRouter.get("/pool", getPools);

export default poolRouter;