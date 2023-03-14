interface IButton_Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ onClick, children }: IButton_Props) => {
  return (
    <button className={`w-8 h-8 bg-red-500`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
