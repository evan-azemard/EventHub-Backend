import express from "express";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares/errorHandler";
import { eventRoute } from "./routes/eventRoutes";
import { authRoute } from "./routes/authRoutes";
import { swaggerDocument } from "./swagger";

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute);

app.use(errorHandler);

export default app;