import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the TableEase API",
  });
});

export default app;