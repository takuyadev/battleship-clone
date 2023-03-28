import { ComponentProps } from 'react';

export interface GridButtonProps extends ComponentProps<'button'> {
  text: string;
  status: number;
  className?: string;
  icon?: React.ReactNode;
}

const GridButton = ({
  icon,
  text,
  status,
  className,
  ...props
}: GridButtonProps) => {
  // Depending on UI status, change the style of the tile
  const selectClass = (status: number) => {
    if (status === 0) {
      return `bg-slate-100 text-slate-200 hover:bg-indigo-300 hover:text-indigo-600`;
    }

    if (status === 1) {
      return 'bg-indigo-300 hover:text-indigo-300 text-indigo-500 hover:bg-indigo-900 hover:text-slate-300';
    }

    if (status === -1) {
      return 'bg-slate-200 text-slate-50 pointer-events-none';
    }

    if (status === -2) {
      return 'bg-rose-200 text-rose-500 pointer-events-none';
    }
  };

  return (
    <button
      className={`${selectClass(
        status
      )} ${className} flex items-center justify-center text-sm w-full h-10 font-body ease-out duration-200 rounded-lg shadow-inner `}
      {...props}
    >
      {text && text}
      {icon && icon}
    </button>
  );
};

export default GridButton;
