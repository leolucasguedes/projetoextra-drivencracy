import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import chalk from "chalk";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db = null;

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log(chalk.bold.green("Connected to database"));
} catch (e) {
  console.log(e);
}

export default db;
