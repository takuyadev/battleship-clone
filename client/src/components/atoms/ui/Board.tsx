import { ComponentProps } from 'react';

export interface BoardProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  size: number;
  className?: string;
}

const Board = ({ className, children, ...props }: BoardProps): JSX.Element => {
  return (
    <div
      className={`${className} flex w-full justify-center flex-col align-self-center justify-self-center gap-1 p-2 bg-slate-50 border-2 border-slate-100 rounded-lg overflow-hidden`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Board;
