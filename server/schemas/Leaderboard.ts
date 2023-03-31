import { Schema, model } from 'mongoose';

interface LeaderBoard {
  username: string;
  turnCount: number;
}

const LeaderboardSchema = new Schema<LeaderBoard>({
  turnCount: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default model('Leaderboard', LeaderboardSchema);
