interface IButton_Props extends React.ComponentProps<'button'> {
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
}: IButton_Props) => {

  // Depending on UI status, change the style of the tile
  const selectClass = (status: number) => {
    if (status === 0) {
      return `bg-indigo-100 text-indigo-200 hover:bg-indigo-200 hover:text-indigo-500`;
    }

    if (status === 1) {
      return 'bg-indigo-300 hover:text-indigo-300 text-indigo-900 hover:bg-indigo-900 hover:text-slate-300';
    }

    if (status === 1) {
      return 'bg-indigo-300 hover:text-indigo-300 text-indigo-900 hover:bg-indigo-900 hover:text-slate-300';
    }
  };

  return (
    <button
      className={`${selectClass(
        status
      )} ${className} flex items-center justify-center text-sm w-10 h-10 font-body p-3 ease-out duration-200 font-bold hover:scale-110 rounded-lg shadow-inner hover:shadow-md`}
      {...props}
    >
      {text && text}
      {icon && icon}
    </button>
  );
};

export default GridButton;
