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
}