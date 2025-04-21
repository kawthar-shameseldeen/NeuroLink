import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import patientRoutes from "./routes/patient.routes.js";

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use("/api", userRoutes);

app.use("/api", authRouter);

app.use("/api/medicines", medicineRoutes);

app.use("/api/patients", patientRoutes);
// Create HTTP server from the Express app
const server = http.createServer(app);

// Create a WebSocketServer using the same HTTP server (if you need WebSockets)
const wss = new WebSocketServer({ server });

// Start the server
const PORT = process.env.SERVER_PORT || 80;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  databaseConnection(); // Make sure this is a valid function that connects to your DB
});

// Export if needed
export { wss };
