interface ICard_Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: ICard_Props) => {
  return (
    <div className={`flex gap-2 ${className}  p-2 bg-indigo-50 rounded-lg`}>
      {children}
    </div>
  );
};

export default Card;
