import { IBoard } from "../../interfaces/IBoard";
import GameBoard from "../molecules/GameBoard";

interface IGameScreen_Props {
  boards: IBoard;
  updateTile(): () => {}
}

const GameScreen = ({ boards, updateTile }: IGameScreen_Props) => {
  return (
    <div className="flex gap-8">
      <GameBoard updateTile={updateTile} board={boards.player} />
      <GameBoard updateTile={updateTile} board={boards.opponent} />
    </div>
  );
};

export default GameScreen;
