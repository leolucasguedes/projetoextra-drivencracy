import db from "../app/database.js";

import { poolSchema } from "../schemas/validateSchemas.js";

export async function createPool(req,res){
    const {error} = poolSchema.validate(req.body);
    if(error) {
      return res.sendStatus(422);
    }
    try{
        await db.collection("pools").insertOne({
            title: req.body.title,
            expireAt: req.body.expireAt
        });
        res.status(201).send("Enquete criada com sucesso");
    }catch(e){
        console.error(e);
        res.status(500).send("Erro de conexão com servidor");
    }
}

export async function getPools(req, res) {
    try {
      const pools = await db.collection("pools").find({}).toArray();
      res.status(200).send(pools);
    } catch (err) {
      res.status(401).send("Erro ao carregar as enquetes");
    }
  }