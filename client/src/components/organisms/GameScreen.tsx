import { IGame } from "../../models/interfaces/IGame";
import { AttackTile } from "../../models/types/Game";
import GameBoard from "../molecules/GameBoard";
import { formatBoard } from "../../utils/board";

interface IGameScreen_Props {
  boards: IGame;
  playerAttack: AttackTile,
  enemyAttack: AttackTile
}

const GameScreen = ({ boards, playerAttack, enemyAttack}: IGameScreen_Props) => {
  return (
    <div className="flex gap-8">
      <GameBoard
        onClick={(x: number, y: number) => enemyAttack(x, y)}
        board={formatBoard(boards.player.board, true)}
      />
      <GameBoard
        onClick={(x: number, y: number) => playerAttack(x, y)}
        board={formatBoard(boards.opponent.board, false)}
      />
    </div>
  );
};

export default GameScreen;
