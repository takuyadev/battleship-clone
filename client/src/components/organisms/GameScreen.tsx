import { IBoard } from "../../interfaces/IBoard";
import GameBoard from "../molecules/GameBoard";

interface IGameScreen_Props {
  boards: IBoard;
  updateTile: (player: "player" | "opponent", x: number, y: number) => void;
}

const GameScreen = ({ boards, updateTile }: IGameScreen_Props) => {
  return (
    <div className="flex gap-8">
      <GameBoard onClick={(x: number, y: number) => updateTile("player", x, y)} board={boards.player} />
      <GameBoard onClick={(x: number, y: number) => updateTile("opponent", x, y)} board={boards.opponent} />
    </div>
  );
};

export default GameScreen;
