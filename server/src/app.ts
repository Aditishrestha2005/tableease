import express from "express";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/error.middleware";
import authMiddleware, { AuthRequest } from "./middleware/auth.middleware";
import roleMiddleware from "./middleware/role.middleware";

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

app.get("/api/v1/protected", authMiddleware, (req: AuthRequest, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully.",
    user: req.user,
  });
});

app.get(
  "/api/v1/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin ",
    });
  }
);

// Global Error Handler
app.use(errorHandler);

export default app;