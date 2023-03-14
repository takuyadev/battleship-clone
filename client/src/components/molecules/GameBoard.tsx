// ? TypeScript Interfaces
import Button from "../atoms/Button";
import Board from "../atoms/Board";
import { IPlayer } from "../../interfaces/IBoard";

interface IGameBoard_Props {
  board: IPlayer;
  onClick: (x: number, y: number) => void;
}

/*
  BOARD LEGEND
  1 === ship is there
  0 === ship is not there
  -1 === ship was not there, and has been hit
  -2 === ship was there, and has been hit
*/

const GameBoard = ({ board, onClick }: IGameBoard_Props) => {
  return (
    <Board>
      {board &&
        board.board.map((arr, x) => (
          <div>
            {arr.map((num, y) => (
              <Button onClick={() => onClick(x, y)}>{num}</Button>
            ))}
          </div>
        ))}
    </Board>
  );
};

export default GameBoard;
