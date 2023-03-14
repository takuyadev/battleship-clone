// ? TypeScript Interfaces
import Button from "../atoms/Button";
import Board from "../atoms/Board";
import { IPlayer } from "../../interfaces/IBoard";

interface IGameBoard_Props {
  board: IPlayer;
  updateTile(): () => {};
}

const GameBoard = ({ board, updateTile }: IGameBoard_Props) => {
  return (
    <Board>
      {board &&
        board.board.map((arr, x) => {
          const row = arr.map((num, y) => {
            return <Button onClick={() => updateTile("player", x, y)}>{num}</Button>;
          });
          return <div>{row}</div>;
        })}
    </Board>
  );
};

/*
  BOARD LEGEND
  1 === ship is there
  0 === ship is not there
  -1 === ship was not there, and has been hit
  -2 === ship was there, and has been hit
*/

export default GameBoard;
