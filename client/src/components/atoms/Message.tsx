interface IMessage {
  children: React.ReactNode;
}

const Message = ({ children }: IMessage): JSX.Element => {
  return <p className="p-4 rounded-lg even:bg-slate-200 ">{children}</p>;
};

export { Message };
