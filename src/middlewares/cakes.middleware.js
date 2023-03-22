import connection from "../database/connection.js";
import { cakesSchema } from "../schemas/cakes.schema.js";

export const postCakesMiddleware = async (req, res, next) => {
    const { name, price, image, description } = req.body;

    try {
        const cakesValidation = cakesSchema.validate({ name, price, image, description });
        if(cakesValidation.error) {
            if(cakesValidation.error.message == '"image" is required') {
                return res.status(422).send(cakesValidation.error.message);
            }
            return res.status(400).send(cakesValidation.error.message);
        }

        const cakeNameExists = await connection.query(`SELECT * FROM cakes WHERE name = $1`, [name]);
        if(cakeNameExists.rows.length != 0) {
            return res.status(409).send("Cake name already in use");
        }

        if(price <= 0) {
            return res.status(400).send("Price must be greater than zero");
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};