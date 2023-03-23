import connection from "../database/connection.js";

export const postOrderController = async (req, res) => {
    const {  clientId, cakeId, quantity } = req.body;

    try {
        const { rows } = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [cakeId]);
        const totalPrice = rows[0].price * quantity;

        const postNewOrder = await connection.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)`, [clientId, cakeId, quantity, totalPrice]);
        return res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};