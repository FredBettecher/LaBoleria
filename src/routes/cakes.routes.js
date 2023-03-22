import { Router } from "express";
import { postCakesController } from "../controllers/cakes.controller.js";
import { postCakesMiddleware } from "../middlewares/cakes.middleware.js";

export const cakesRoutes = Router();

cakesRoutes.post("/cakes", postCakesMiddleware, postCakesController);