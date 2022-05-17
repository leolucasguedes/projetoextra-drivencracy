import joi from "joi"

export const poolSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.string(),
})