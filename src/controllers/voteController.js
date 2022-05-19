import { ObjectId } from "mongodb";
import db from "../app/database.js";
import dayjs from "dayjs";

export async function createVote(req, res) {
  const { id } = req.params;

  const choiceValid = await db
    .collection("choices")
    .findOne({ _id: new ObjectId(id) });
  if (!choiceValid) {
    return res.status(404).send("Escolha não encontrada");
  }
  const { poolId } = choiceValid;
  const poolValid = await db
    .collection("pools")
    .findOne({ _id: new ObjectId(poolId) });
  const { expireAt } = poolValid;
  let now = dayjs();
  if (now.isAfter(dayjs(expireAt))) {
    return res.status(403).send("Enquete expirada");
  }
  try {
    await db.collection("votes").insertOne({
      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      choiceId: new ObjectId(id),
    });
    res.status(201).send("Voto salvo com sucesso");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}
