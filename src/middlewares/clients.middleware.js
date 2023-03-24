import connection from "../database/connection.js";
import { clientsSchema } from "../schemas/clients.schema.js";

export const postClientsMiddleware = async (req, res, next) => {
    const { name, adress, phone } = req.body;

    try {
        const clientsValidation = clientsSchema.validate({ name, adress, phone });
        if(clientsValidation.error) {
            return res.status(400).send(clientsValidation.error.message);
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const getOrdersByClientMidlleware = async (req, res, next) => {
    const { id } = req.params;

    try {
        const idIsValid = await connection.query(`SELECT * FROM clients WHERE id = ${id}`);
        if(idIsValid.rows.length === 0) {
            return res.status(404).send("Client id not found");
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};