import {Router} from "express";

import { getResult } from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get("/pool", getResult);

export default resultRouter;