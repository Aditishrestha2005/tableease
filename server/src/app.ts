import express from "express";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the TableEase API ",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;