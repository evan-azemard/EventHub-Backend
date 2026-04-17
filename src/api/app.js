import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares/errorHandler";
import { responseMiddleware } from "./middlewares/responseMiddleware";
import { eventRoute } from "./routes/eventRoutes";
import { authRoute } from "./routes/authRoutes";
import { swaggerDocument } from "./swagger";
import { a2fRouter } from './routes/a2fRoutes';
import { testRouter } from './routes/testRoutes';
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(responseMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/a2f', a2fRouter);
app.use('/api/test', testRouter);
app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map