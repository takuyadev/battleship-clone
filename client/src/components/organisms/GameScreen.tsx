import { IGame } from "../../models/interfaces";
import { AttackTile, Messages } from "../../models/types";
import GameBoard from "../molecules/GameBoard";
import { formatBoard } from "../../utils/board/board";
import { Log } from "../molecules/Log";

interface IGameScreen_Props {
  boards: IGame;
  playerAttack: AttackTile;
  enemyAttack: AttackTile;
  messages: Messages
}

const GameScreen = ({ boards, playerAttack, enemyAttack, messages }: IGameScreen_Props) => {
  return (
    <main>
      <div className="flex justify-around gap-8 items-center m-8">
        <GameBoard
          onClick={(x: number, y: number) => enemyAttack(x, y)}
          board={formatBoard(boards.player.board, true)}
        />
        vs
        <GameBoard
          onClick={(x: number, y: number) => playerAttack(x, y)}
          board={formatBoard(boards.opponent.board, false)}
        />
      </div>
      <div>
      <Log data={messages}/>
      </div>
    </main>
  );
};

export default GameScreen;
