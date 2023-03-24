import { Router } from "express";
import { getOrdersByIdController, getOrdersController, postOrderController } from "../controllers/orders.controller.js";
import { postOrderMiddleware, getOrderMiddleware, getOrdersByIdMiddleware } from "../middlewares/orders.middleware.js";

export const ordersRoutes = Router();

ordersRoutes.post("/order", postOrderMiddleware, postOrderController);
ordersRoutes.get("/orders", getOrderMiddleware, getOrdersController);
ordersRoutes.get("/orders/:id", getOrdersByIdMiddleware, getOrdersByIdController);