import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use("/", (req, res) => {
  res.send("Hello TK Stores Backend Server is Here! ");
});

export default app;
