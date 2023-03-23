import { Router } from "express";
import { postOrderController } from "../controllers/orders.controller.js";
import { postOrderMiddleware } from "../middlewares/orders.middleware.js";

export const ordersRoutes = Router();

ordersRoutes.post("/order", postOrderMiddleware, postOrderController)