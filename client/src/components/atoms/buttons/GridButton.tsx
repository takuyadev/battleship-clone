interface IButton_Props {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
}

const GridButton = ({ className, onClick, children }: IButton_Props) => {
  return (
    <button className={`${className} w-12 h-12 bg-green-100  duration-200 hover:bg-green-500`} onClick={onClick}>
      {children}
    </button>
  );
};

export default GridButton;
