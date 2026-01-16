import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { eventRoute } from "./routes/eventRoutes";

const app = express();

app.use(express.json());

app.use('/api/events', eventRoute);

app.use(errorHandler);

export default app;