import http from 'http';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from "cors"
import express, { Request, Response } from 'express';
import Leaderboard from './schemas/Leaderboard';

// Use .env configuration
dotenv.config();

// Setup server
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Get leaderboard in ascending order
app.get('/leaderboard', async (_req: Request, res: Response) => {
  const data = await Leaderboard.find({}).sort({ turnCount: 1 });

  if (!data) {
    res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    sucess: true,
    data,
  });
});

// Create new leaderboard
app.post('/leaderboard', async (req: Request, res: Response) => {
  const data = await Leaderboard.create({
    username: req.body.username,
    turnCount: req.body.turnCount,
  });

  if (!data) {
    res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    data: req.body,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on: ${process.env.PORT}`);
});
