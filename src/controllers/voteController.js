import db from "../app/database.js";
import dayjs from "dayjs";

export async function createVote(req, res) {
  const { id, createdAt, choiceId } = req.body;

  const choiceValid = await db.collection("choices").findOne({ id });
  if (!choiceValid) {
    return res.status(404).send("Enquete não encontrada");
  }
  const poolValid = await db.collection("pools").findOne({ id });
  const { expireAt } = poolValid;
  let now = dayjs();
  if (now.isAfter(dayjs(expireAt))) {
    return res.status(403).send("Enquete expirada");
  }
  try {
    await db.collection("votes").insertOne({
      id,
      createdAt,
      choiceId,
    });
    res.status(201).send("Voto salvo com sucesso");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}
