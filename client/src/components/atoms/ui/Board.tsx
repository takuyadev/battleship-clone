import { ComponentProps } from 'react';

export interface BoardProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  size: number;
}

const Board = ({ children, ...props }: BoardProps): JSX.Element => {
  return (
    <div
      className={`flex flex-col gap-2 p-2 w-fit bg-indigo-50 rounded-lg overflow-hidden`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Board;
