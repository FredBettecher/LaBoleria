import connection from "../database/connection.js";

export const postCakesController = async (req, res) => {
    const { name, price, image, description } = req.body;

    try {
        const postNewCake = await connection.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`, [name, price, image, description]);
        return res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};