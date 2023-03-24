import { Router } from "express";
import { getOrderController, postOrderController } from "../controllers/orders.controller.js";
import { postOrderMiddleware, getOrderMiddleware } from "../middlewares/orders.middleware.js";

export const ordersRoutes = Router();

ordersRoutes.post("/order", postOrderMiddleware, postOrderController);
ordersRoutes.get("/orders", getOrderMiddleware, getOrderController);