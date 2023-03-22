import connection from "../database/connection.js";

export const postClientsController = async (req, res) => {
    const { name, adress, phone } = req.body;

    try {
        const postNewClient = await connection.query(`INSERT INTO clients (name, adress, phone) VALUES ($1, $2, $3)`, [name, adress, phone]);
        return res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err.message);
    }
}