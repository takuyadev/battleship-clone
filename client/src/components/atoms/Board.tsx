import React from "react";

interface IBoard_Props {
  children: React.ReactNode;
}

const Board = ({ children }: IBoard_Props): JSX.Element => {
  return <div className="overflow-hidden rounded-lg">{children}</div>;
};

export default Board;
