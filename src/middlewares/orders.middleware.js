import { ordersSchema } from "../schemas/orders.schema.js";

export const postOrderMiddleware = async (req, res, next) => {
    const { clientId, cakeId, quantity } = req.body;
    
    try {
        const ordersValidatition = ordersSchema.validate({ clientId, cakeId, quantity });
        if(quantity <= 0 || quantity > 5) {
            return res.status(400).send("Number of orders must be greater than zero and less than 6");
        }

        if(ordersValidatition.error) {
            return res.status(404).send(ordersValidatition.error.message);
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};