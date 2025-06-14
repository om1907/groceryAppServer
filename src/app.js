import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS;

//middlewares configuration
app.use(express.json());  
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.use('/api/v1', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;