import express, {json} from "express";
import chalk from "chalk";
import cors from "cors"
import dotenv from "dotenv"

import poolRouter from "./../routes/poolRouter.js";
import choiceRouter from "./../routes/choiceRouter.js"
import voteRouter from "./../routes/voteeRouter.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(poolRouter);
app.use(choiceRouter);
app.use(voteRouter);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
console.log(chalk.green.bold(`Server is running on port http://localhost:${PORT}`))
})