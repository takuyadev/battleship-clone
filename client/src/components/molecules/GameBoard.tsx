// ? TypeScript Interfaces
import Button from "../atoms/Button";
import Board from "../atoms/Board";
import { IPlayer } from "../../models/interfaces";
import { formatBoard } from "../../utils/board";
import { IBoard } from "../../models/types";

interface IGameBoard_Props {
  board: IBoard;
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
        board.map((arr, x) => (
          <div key={x}>
            {arr.map((num, y) => (
              <Button
                key={y}
                className={`${num === -1 ? "bg-red-200" : "bg-green-200"}`}
                onClick={() => onClick(x, y)}
              >
                {num}
              </Button>
            ))}
          </div>
        ))}
    </Board>
  );
};

export default GameBoard;
