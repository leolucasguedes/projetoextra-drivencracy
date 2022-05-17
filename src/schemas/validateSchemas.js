import joi from "joi";

export const poolSchema = joi.object({
  title: joi.string().min(1).required(),
  expireAt: joi.string(),
});

export const choiceSchema = joi.object({
  title: joi.string().min(1).required(),
  poolId: joi.string().required,
});
