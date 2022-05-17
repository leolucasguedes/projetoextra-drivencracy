import {Router} from "express";

import { createChoice, getChoices } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", createChoice);
choiceRouter.get("/pool/:id/choice", getChoices);

export default choiceRouter;