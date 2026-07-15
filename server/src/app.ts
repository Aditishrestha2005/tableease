import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/error.middleware";
import authMiddleware, { AuthRequest } from "./middleware/auth.middleware";
import roleMiddleware from "./middleware/role.middleware";
import restaurantRoutes from "./routes/restaurant.route";
import tableRoutes from "./routes/table.route";
import reservationRoutes from "./routes/reservation.route";
import profileRoutes from "./routes/profile.route";
import dashboardRoutes from "./routes/dashboard.route";
import mfaRoutes from "./routes/mfa.route";

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the TableEase API ",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/tables", tableRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/mfa", mfaRoutes);


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