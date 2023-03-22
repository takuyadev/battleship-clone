import React from 'react';

interface IBoard_Props {
  children: React.ReactNode;
  size: number
}

const Board = ({ children, size }: IBoard_Props): JSX.Element => {
  return (
    <div className={`flex flex-col gap-2 w-fit p-2 bg-indigo-50 rounded-lg overflow-hidden`}>
      {children}
    </div>
  );
};

export default Board;
