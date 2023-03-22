import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { cakesRoutes } from "./routes/cakes.routes.js";
import { clientsRoutes } from "./routes/clients.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cakesRoutes);
app.use(clientsRoutes);

app.listen(process.env.PORT, () => console.log("Process running on port: ", process.env.PORT));