import db from "../app/database.js";

import { choiceSchema } from "../schemas/validateSchemas.js";

export async function createChoice(req,res){
    const { title, poolId } = req.body;
    const {error} = choiceSchema.validate(req.body);
    if(error) {
      return res.sendStatus(422);
    }
    const poolValid = await db.collection("pools").findOne({ poolId });
    if (!poolValid) {
      return res.status(404).send("Enquete não encontrada");
    }
    const choiceValid = await db.collection("choices").findOne({ title });
    if (choiceValid) {
      return res.status(409).send("Opção de voto já existe.");
    }
    try{
        await db.collection("choices").insertOne({
            title: title,
            poolId: poolId
        });
        res.status(201).send("Opção de voto criada com sucesso");
    }catch(e){
        console.error(e);
        res.status(500).send("Erro de conexão com servidor");
    }
}

export async function getChoices(req, res) {
    const id = req.params.id;
    const poolValid = await db.collection("pools").findOne({ id });
    if (!poolValid) {
      return res.status(404).send("Enquete não encontrada");
    }
    try {
      const choices = await db.collection("choices").find({}).toArray();
      res.status(200).send(choices);
    } catch (err) {
      res.status(401).send("Erro ao carregar as escolhas");
    }
  }