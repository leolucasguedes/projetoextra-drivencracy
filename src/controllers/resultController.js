import { ObjectId } from "mongodb";
import db from "../app/database.js";

export async function getResult(req, res) {
  const { id } = req.params;
    try {
      const pool = await db.collection("pools").findOne({ _id: new ObjectId(id) });
      if (!pool) {
        return res.status(404).send("Enquete não encontrada");
      }
      const { _id, title, expireAt } = pool;
      const choices = await db.collection("choices").find({ poolId: id }).toArray();
      const idsChoice = []
      choices.forEach(choice => idsChoice.push(choice._id));
       
      const votes = await db.collection("votes").find({ choiceId: {$in:idsChoice}}).toArray();

      let winner = {
        title: "",
        votes: 0,
      };

      idsChoice.forEach((choiceid) => {
        const targetVotes = [];
        votes.filter((vote) => {
          let choicestring = choiceid.toString();
          let votestring = vote.choiceId.toString();
          if(votestring === choicestring){
            targetVotes.push(vote)
          }
        })

        if (winner.votes < targetVotes.length) {
          const targetChoice = [];
          choices.filter((choice) => {
            let choiceidstring = choiceid.toString();
            let choicestring = choice._id.toString();
            if(choicestring === choiceidstring){
              targetChoice.push(choice.title)
            }
          })
          choices.filter((choice) => choice._id === choiceid);
          winner = {
            title: targetChoice[0],
            votes: targetVotes.length,
          };
        }
      });

      const result = {
        _id: _id,
        title: title,
        expireAt: expireAt,
        result : {
          title: winner.title,
          votes: winner.votes
        }
    }
      res.status(200).send(result);
    } catch (err) {
      res.status(401).send("Erro ao carregar o resultado");
    }
  }