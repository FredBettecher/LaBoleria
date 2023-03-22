import { Router } from "express";
import { postClientsController } from "../controllers/clients.controller.js";
import { postClientsMiddleware } from "../middlewares/clients.middleware.js";

export const clientsRoutes = Router();

clientsRoutes.post("/clients", postClientsMiddleware, postClientsController);