import express, { Request, Response } from 'express';
import { leaderboardData } from './data/leaderboardData';
import cors from 'cors';
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/leaderboard', (_req: Request, res: Response) => {
  const data = leaderboardData.sort((a, b) => {
    return a.turnCount + b.turnCount;
  });

  res.status(200).json({
    data,
    sucess: true,
  });
});

app.post('/leaderboard', (req: Request, res: Response) => {
  leaderboardData.push(req.body);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log('System is listening @ 5000');
});
