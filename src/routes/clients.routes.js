import { Router } from "express";
import { getOrdersByClientController, postClientsController } from "../controllers/clients.controller.js";
import { getOrdersByClientMidlleware, postClientsMiddleware } from "../middlewares/clients.middleware.js";

export const clientsRoutes = Router();

clientsRoutes.post("/clients", postClientsMiddleware, postClientsController);
clientsRoutes.get("/clients/:id/orders", getOrdersByClientMidlleware, getOrdersByClientController);