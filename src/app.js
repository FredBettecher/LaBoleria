import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { cakesRoutes } from "./routes/cakes.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cakesRoutes);

app.listen(process.env.PORT, () => console.log("Process running on port: ", process.env.PORT));