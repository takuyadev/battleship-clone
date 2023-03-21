import React from "react";
import { IBoard } from "../../models/types";
import GameBoard from "../molecules/GameBoard";

interface IEditScreen_Props {
  board: IBoard;
  setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
  placeShip: (X: number, y: number) => void;
}

const EditScreen = ({ board, placeShip, setBoard }: IEditScreen_Props) => {
  return <GameBoard board={board} onClick={placeShip} />;
};

export default EditScreen;
