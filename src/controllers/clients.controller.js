import connection from "../database/connection.js";

export const postClientsController = async (req, res) => {
    const { name, adress, phone } = req.body;

    try {
        const postNewClient = await connection.query(`INSERT INTO clients (name, adress, phone) VALUES ($1, $2, $3)`, [name, adress, phone]);
        return res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const getOrdersByClientController = async (req, res) => {
    const { id } = req.params;

    try {
        const getOrdersByClient = await connection.query(`SELECT
            o.id AS order_id,
            o.quantity AS order_quantity,
            to_char(o."createdAt", 'YYYY-MM-DD HH24:MI') AS order_createdat,
            o."totalPrice" AS order_totalprice,
            ca.id,
            ca.name AS cake_name,
            cl.id
            FROM orders o
            JOIN cakes ca ON o."cakeId" = ca.id
            JOIN clients cl ON o."clientId" = cl.id
            WHERE cl.id = $1`, [id]
        );

        const result = getOrdersByClient.rows.map((i) => {
            return {
                orderId: i.order_id,
                quantity: i.order_quantity,
                createdAt: i.order_createdat,
                totalPrice: i.order_totalprice,
                cakeName: i.cake_name
            }
        });

        return res.status(200).send(result);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};