import joi from "joi";
import date from "@joi/date"

const joiDate = joi.extend(date);

export const ordersSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required(),
});

export const orderDateSchema = joi.object({
    date: joiDate.date().format('YYYY-MM-DD').optional()
});