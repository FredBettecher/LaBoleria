import connection from "../database/connection.js";
import dayjs from "dayjs";

export const postOrderController = async (req, res) => {
    const {  clientId, cakeId, quantity } = req.body;

    try {
        const createdAt = dayjs(Date.now()).format('YYYY-MM-DD HH:mm');
        console.log(createdAt);

        const { rows } = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [cakeId]);
        const totalPrice = rows[0].price * quantity;

        const postNewOrder = await connection.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice") VALUES ($1, $2, $3, $4, $5)`, [clientId, cakeId, quantity, createdAt, totalPrice]);
        return res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const getOrderController = async (req, res) => {
    const { date } = req.query;

    try {
        const getOrder = await connection.query(`SELECT
            cl.id AS client_id,
            cl.name AS client_name,
            cl.adress AS client_adress,
            cl.phone AS client_phone,
            ca.id AS cake_id,
            ca.name AS cake_name,
            ca.price AS cake_price,
            ca.description AS cake_description,
            ca.image AS cake_image,
            o.id AS order_id,
            to_char(o."createdAt", 'YYYY-MM-DD HH24:MI') AS order_createdat,
            o.quantity AS order_quantity,
            o."totalPrice" AS order_totalprice
            FROM orders o
            JOIN clients cl ON o."clientId" = cl.id
            JOIN cakes ca ON o."cakeId" = ca.id`
        );
        
        const result = getOrder.rows.map((i) => {
            return {
                client:{
                    id: i.client_id,
                    name: i.client_name,
                    adress: i.client_adress,
                    phone: i.client_phone
                },
                cake:{
                    id: i.cake_id,
                    name: i.cake_name,
                    price: i.cake_price,
                    description: i.cake_description,
                    image: i.cake_image
                },
                orderId: i.order_id,
                createdAt: i.order_createdat,
                quantity: i.order_quantity,
                totalPrice: i.order_totalprice
            };
        });
        
        if(typeof(date) !== "undefined") {
            const resultByDate = [];
            for(let i=0; i<result.length; i++) {
                if(date === result[i].createdAt.slice(0, 10)) {
                    resultByDate.push(result[i]);
                }
            }
            return res.status(200).send(resultByDate);
        }

        return res.status(200).send(result);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};